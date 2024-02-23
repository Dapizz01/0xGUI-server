// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { corsHeaders } from "../_shared/cors.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
    const { filename } = await req.json();

    const response = await fetch("https://0x0.st/" + filename);
    if (!response.ok) {
        // TODO: Handle 0x0.st bad gateway / other errors

        return new Response("", {
            headers: {
                ...corsHeaders,
            },
            status: 404,
            statusText: "The requested file doesn't exist",
        });
    }

    return new Response(await response.blob(), {
        headers: {
            ...corsHeaders,
            "Content-Type": response.headers.get("Content-Type") ?? "", // Sets content type to "" if the get() returns null or undefined
        },
    });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/fetch_file' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
