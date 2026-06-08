import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const token = "sbp_dbafba4f892f64afae54617e0b9728e4254d82f8";
const url = new URL("https://mcp.supabase.com/mcp?project_ref=dvsawlgeadyssxpywtoq&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching%2Cstorage");

const transport = new SSEClientTransport(url, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const client = new Client({
  name: "agent-client",
  version: "1.0.0"
}, {
  capabilities: {}
});

async function run() {
  try {
    await client.connect(transport);
    
    const resources = await client.listResources();
    const tools = await client.listTools();
    
    console.log("Tools available:", tools.tools.map(t => t.name));
    
    console.log("\nCalling list_tables...");
    const result = await client.callTool({
      name: "list_tables",
      arguments: {
        schemas: ["public"],
        verbose: false
      }
    });
    
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    process.exit(0);
  }
}

run();
