
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers to allow cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// The assistant ID to use
const ASSISTANT_ID = "asst_r0GtYxfZYARE3UUtheC3jlk4";
const API_KEY = "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";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, threadId } = await req.json();
    console.log(`Received request with message: ${message} and threadId: ${threadId || 'new thread'}`);

    if (!API_KEY) {
      throw new Error("API_KEY is not set");
    }

    // Create or retrieve a thread
    let currentThreadId = threadId;
    if (!currentThreadId) {
      // Create a new thread
      console.log("Creating new thread...");
      const response = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to create thread. Status: ${response.status}, Response: ${errorText}`);
        throw new Error(`Failed to create thread: ${errorText}`);
      }

      const data = await response.json();
      currentThreadId = data.id;
      console.log(`Created new thread with ID: ${currentThreadId}`);
    }

    // Add the user message to the thread
    console.log(`Adding message to thread ${currentThreadId}...`);
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        role: 'user',
        content: message
      })
    });

    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.error(`Failed to add message. Status: ${messageResponse.status}, Response: ${errorText}`);
      throw new Error(`Failed to add message to thread: ${errorText}`);
    }
    
    console.log("Message added successfully");

    // Run the assistant on the thread
    console.log(`Running assistant ${ASSISTANT_ID} on thread ${currentThreadId}...`);
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error(`Failed to run assistant. Status: ${runResponse.status}, Response: ${errorText}`);
      throw new Error(`Failed to run assistant: ${errorText}`);
    }

    const runData = await runResponse.json();
    const runId = runData.id;
    console.log(`Started run with ID: ${runId}`);

    // Poll for the completion of the run
    let runStatus = runData.status;
    let attempts = 0;
    const maxAttempts = 120; // Increase maximum polling attempts
    const pollingInterval = 1000; // 1 second polling interval
    
    while (runStatus !== 'completed' && runStatus !== 'failed' && attempts < maxAttempts) {
      console.log(`Checking run status (${attempts + 1}/${maxAttempts}): ${runStatus}`);
      
      // Wait for polling interval
      await new Promise(resolve => setTimeout(resolve, pollingInterval));
      
      // Check the status of the run
      const statusResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      
      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error(`Failed to get run status. Status: ${statusResponse.status}, Response: ${errorText}`);
        throw new Error(`Failed to get run status: ${errorText}`);
      }
      
      const statusData = await statusResponse.json();
      runStatus = statusData.status;
      attempts++;

      // If the run requires action, we need to handle it
      if (runStatus === 'requires_action') {
        console.error("Run requires action but this functionality is not implemented");
        throw new Error("Run requires action but this functionality is not implemented");
      }
    }
    
    if (runStatus !== 'completed') {
      console.error(`Run did not complete successfully. Final status: ${runStatus} after ${attempts} attempts`);
      throw new Error(`Run did not complete successfully. Final status: ${runStatus} after ${attempts} attempts`);
    }

    console.log(`Run completed successfully after ${attempts} attempts`);

    // Get the latest messages from the thread
    console.log(`Getting messages from thread ${currentThreadId}...`);
    const listMessagesResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    if (!listMessagesResponse.ok) {
      const errorText = await listMessagesResponse.text();
      console.error(`Failed to list messages. Status: ${listMessagesResponse.status}, Response: ${errorText}`);
      throw new Error(`Failed to list messages: ${errorText}`);
    }

    const messagesData = await listMessagesResponse.json();
    console.log(`Retrieved ${messagesData.data.length} messages`);
    
    // Get the most recent assistant message
    const assistantMessages = messagesData.data.filter(msg => msg.role === 'assistant');
    if (assistantMessages.length === 0) {
      console.error('No assistant messages found in the thread');
      throw new Error('No assistant messages found in the thread');
    }
    
    const latestAssistantMessage = assistantMessages[0];
    console.log(`Latest assistant message: ${JSON.stringify(latestAssistantMessage)}`);
    
    let assistantResponse = "No se pudo obtener una respuesta.";
    
    // Check if content exists and has the expected structure
    if (latestAssistantMessage.content && 
        Array.isArray(latestAssistantMessage.content) && 
        latestAssistantMessage.content.length > 0 &&
        latestAssistantMessage.content[0].type === 'text' &&
        latestAssistantMessage.content[0].text &&
        latestAssistantMessage.content[0].text.value) {
      assistantResponse = latestAssistantMessage.content[0].text.value;
    }
    
    console.log(`Parsed assistant response: ${assistantResponse}`);
    
    // Return the assistant's response and the thread ID
    return new Response(
      JSON.stringify({
        response: assistantResponse,
        threadId: currentThreadId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        response: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
