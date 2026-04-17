import { callWebflowTool } from "./webflow-client.mjs";

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error("Usage: node webflow.mjs <tool_name> <actions_json> [context] [site_id]");
    console.error("Example: node webflow.mjs style_tool '[{\"label\":\"styles\",\"get_styles\":{\"query\":\"all\"}}]' 'Fetching styles'");
    process.exit(1);
  }

  const toolName = args[0];
  let actions;
  
  try {
    actions = JSON.parse(args[1]);
  } catch (e) {
    console.error("Error: <actions_json> must be a valid JSON string.");
    console.error(e.message);
    process.exit(1);
  }

  const context = args[2] || `Executing ${toolName}`;
  const siteId = args[3] || undefined; // Will fallback to SITE_ID in webflow-client.mjs if not provided

  try {
    const result = await callWebflowTool(toolName, actions, context, siteId);
    // Print only the JSON result so it can be piped or parsed by other tools
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error executing Webflow tool:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

main().catch(e => {
  console.error("Unhandled error:", e);
  process.exit(1);
});
