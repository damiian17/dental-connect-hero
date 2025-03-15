// supabase/functions/chat-assistant/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import OpenAI from "https://esm.sh/openai@4.28.0";

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

    // Check environment variables
    if (!API_KEY) {
      console.error("OPENAI_API_KEY is not set in environment variables");
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY secret in Supabase."
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!ASSISTANT_ID) {
      console.error("OPENAI_ASSISTANT_ID is not set in environment variables");
      return new Response(
        JSON.stringify({
          error: "OpenAI Assistant ID is not configured. Please set the OPENAI_ASSISTANT_ID secret in Supabase."
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Log key format for debugging (safely)
    console.log("API Key format check:", API_KEY.substring(0, 7) + "...");
    console.log("API Key length:", API_KEY.length);

    // Initialize OpenAI client with v2 headers
    try {
      const openai = new OpenAI({
        apiKey: API_KEY,
        defaultHeaders: {
          'OpenAI-Beta': 'assistants=v2'
        }
      });

      console.log("OpenAI client initialized successfully with v2 headers");

      // Create or retrieve a thread
      let currentThreadId = threadId;
      if (!currentThreadId) {
        try {
          // Create a new thread
          const thread = await openai.beta.threads.create();
          currentThreadId = thread.id;
          console.log(`Created new thread with ID: ${currentThreadId}`);
        } catch (createError) {
          console.error("Error creating thread:", createError);
          return new Response(
            JSON.stringify({
              error: `Failed to create thread: ${createError.message}`
            }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }

      try {
        // Add the user message to the thread
        await openai.beta.threads.messages.create(currentThreadId, {
          role: "user",
          content: message
        });
        
        console.log("Added user message to thread");

        // Run the assistant on the thread
        const run = await openai.beta.threads.runs.create(currentThreadId, {
          assistant_id: ASSISTANT_ID
        });
        
        console.log(`Started run with ID: ${run.id}`);

        // Poll for the completion of the run
        let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
        let attempts = 0;
        const maxAttempts = 30;
        
        while (runStatus.status !== "completed" && runStatus.status !== "failed" && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
          attempts++;
          console.log(`Run status: ${runStatus.status}, attempt: ${attempts}`);
          
          if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
            return new Response(
              JSON.stringify({
                error: `Run ended with status: ${runStatus.status}`
              }),
              {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            );
          }
        }
        
        if (runStatus.status !== "completed") {
          return new Response(
            JSON.stringify({
              error: `Run did not complete successfully. Final status: ${runStatus.status}`
            }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        // Get the latest messages from the thread
        const messages = await openai.beta.threads.messages.list(currentThreadId);
        
        // Get the most recent assistant message
        const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
        if (assistantMessages.length === 0) {
          return new Response(
            JSON.stringify({
              error: 'No assistant messages found in the thread'
            }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
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
      } catch (apiError) {
        console.error("OpenAI API error:", apiError);
        return new Response(
          JSON.stringify({
            error: `OpenAI API error: ${apiError.message}`
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    } catch (clientError) {
      console.error("Error initializing OpenAI client:", clientError);
      return new Response(
        JSON.stringify({
          error: `Failed to initialize OpenAI client: ${clientError.message}`
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
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
