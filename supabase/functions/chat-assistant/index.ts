
// supabase/functions/chat-assistant/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers to allow cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get environment variables
const ASSISTANT_ID = Deno.env.get("OPENAI_ASSISTANT_ID");
const API_KEY = Deno.env.get("OPENAI_API_KEY");

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
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    if (!ASSISTANT_ID) {
      throw new Error("OPENAI_ASSISTANT_ID is not set in environment variables");
    }

    console.log("Using API key format: " + API_KEY.substring(0, 7) + "...");
    
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
        const errorText = await response.text();
        console.error(`Failed to create thread: ${errorText}`);
        throw new Error(`Failed to create thread: ${errorText}`);
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
      const errorText = await messageResponse.text();
      console.error(`Failed to add message to thread: ${errorText}`);
      throw new Error(`Failed to add message to thread: ${errorText}`);
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
      const errorText = await runResponse.text();
      console.error(`Failed to run assistant: ${errorText}`);
      throw new Error(`Failed to run assistant: ${errorText}`);
    }

    const runData = await runResponse.json();
    const runId = runData.id;
    console.log(`Started run with ID: ${runId}`);

    // Poll for the completion of the run
    let runStatus = runData.status;
    let attempts = 0;
    const maxAttempts = 30; // Maximum number of polling attempts
    
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
        const errorText = await statusResponse.text();
        console.error(`Failed to get run status: ${errorText}`);
        throw new Error(`Failed to get run status: ${errorText}`);
      }
      
      const statusData = await statusResponse.json();
      runStatus = statusData.status;
      attempts++;
      console.log(`Run status: ${runStatus}, attempt: ${attempts}`);
      
      // Handle required action
      if (runStatus === 'requires_action') {
        console.log("Run requires action - not implemented in this example");
        break;
      }
    }
    
    if (runStatus !== 'completed') {
      throw new Error(`Run did not complete successfully. Final status: ${runStatus}`);
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
      const errorText = await listMessagesResponse.text();
      console.error(`Failed to list messages: ${errorText}`);
      throw new Error(`Failed to list messages: ${errorText}`);
    }

    const messagesData = await listMessagesResponse.json();
    
    // Get the most recent assistant message
    const assistantMessages = messagesData.data.filter(msg => msg.role === 'assistant');
    if (assistantMessages.length === 0) {
      throw new Error('No assistant messages found in the thread');
    }
    
    const latestAssistantMessage = assistantMessages[0];
    const assistantResponse = latestAssistantMessage.content[0].text.value;
    
    console.log(`Assistant response: ${assistantResponse.substring(0, 50)}...`);
    
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
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
