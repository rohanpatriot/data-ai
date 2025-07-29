const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// @ts-ignore: Deno remote imports do not need type declarations
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleDashboardRequest } from "../_shared/perplexityService.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("OK", { status: 200, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const result = await handleDashboardRequest(payload);
    console.log('result payload!', payload)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
