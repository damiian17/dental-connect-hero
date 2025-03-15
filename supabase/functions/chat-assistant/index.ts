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

    // Verificar variables de entorno
    if (!API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    if (!ASSISTANT_ID) {
      throw new Error("OPENAI_ASSISTANT_ID is not set in environment variables");
    }

    console.log("Using API key format: " + API_KEY.substring(0, 7) + "...");

    // Inicializar cliente OpenAI
    const openai = new OpenAI({
      apiKey: API_KEY,
    });

    console.log("OpenAI client initialized");

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
        throw new Error(`Failed to create thread: ${createError.message}`);
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
          throw new Error(`Run ended with status: ${runStatus.status}`);
        }
      }
      
      if (runStatus.status !== "completed") {
        throw new Error(`Run did not complete successfully. Final status: ${runStatus.status}`);
      }

      // Get the latest messages from the thread
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      
      // Get the most recent assistant message
      const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
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
    } catch (apiError) {
      console.error("OpenAI API error:", apiError);
      throw new Error(`OpenAI API error: ${apiError.message}`);
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
