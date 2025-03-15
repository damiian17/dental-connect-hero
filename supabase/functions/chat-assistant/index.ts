
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

    // Initialize OpenAI client
    if (!API_KEY) {
      throw new Error("API_KEY is not set");
    }

    // Create or retrieve a thread
    let currentThreadId = threadId;
    if (!currentThreadId) {
      // Create a new thread
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
        const errorData = await response.json();
        throw new Error(`Failed to create thread: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      currentThreadId = data.id;
      console.log(`Created new thread with ID: ${currentThreadId}`);
    }

    // Add the user message to the thread
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
      const errorData = await messageResponse.json();
      throw new Error(`Failed to add message to thread: ${JSON.stringify(errorData)}`);
    }

    // Run the assistant on the thread
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
      const errorData = await runResponse.json();
      throw new Error(`Failed to run assistant: ${JSON.stringify(errorData)}`);
    }

    const runData = await runResponse.json();
    const runId = runData.id;
    console.log(`Started run with ID: ${runId}`);

    // Poll for the completion of the run
    let runStatus = runData.status;
    let attempts = 0;
    const maxAttempts = 60; // Increase maximum polling attempts
    
    while (runStatus !== 'completed' && runStatus !== 'failed' && attempts < maxAttempts) {
      // Wait for a few seconds
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check the status of the run
      const statusResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      
      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(`Failed to get run status: ${JSON.stringify(errorData)}`);
      }
      
      const statusData = await statusResponse.json();
      runStatus = statusData.status;
      attempts++;
      console.log(`Run status: ${runStatus}, attempt: ${attempts}`);

      // If the run requires action, we need to handle it
      if (runStatus === 'requires_action') {
        throw new Error("Run requires action but this functionality is not implemented");
      }
    }
    
    if (runStatus !== 'completed') {
      throw new Error(`Run did not complete successfully. Final status: ${runStatus} after ${attempts} attempts`);
    }

    // Get the latest messages from the thread
    const listMessagesResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    if (!listMessagesResponse.ok) {
      const errorData = await listMessagesResponse.json();
      throw new Error(`Failed to list messages: ${JSON.stringify(errorData)}`);
    }

    const messagesData = await listMessagesResponse.json();
    
    // Get the most recent assistant message
    const assistantMessages = messagesData.data.filter(msg => msg.role === 'assistant');
    if (assistantMessages.length === 0) {
      throw new Error('No assistant messages found in the thread');
    }
    
    const latestAssistantMessage = assistantMessages[0];
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
    
    console.log(`Assistant response: ${assistantResponse}`);
    
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
