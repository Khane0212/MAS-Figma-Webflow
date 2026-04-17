import {
  Client,
  NodeOAuthClientProvider,
  connectToRemoteServer,
  createLazyAuthCoordinator,
  discoverOAuthServerInfo,
} from "mcp-remote";
import { EventEmitter } from "events";

const serverUrl = "https://mcp.webflow.com/sse";
// You can change this to read from an environment variable later
export const SITE_ID = "69d6045f113e53f87d5d2de9";

let cachedClient = null;

/**
 * Connects to Webflow MCP server and caches the client instance.
 */
export async function getWebflowClient(clientName = "Webflow MCP Client") {
  if (cachedClient) return cachedClient;

  const events = new EventEmitter();
  const serverUrlHash = "mcp.webflow.com";
  const authCoordinator = createLazyAuthCoordinator(serverUrlHash, 3000, events, 60000);
  console.log("Discovering Webflow OAuth server...");
  const discoveryResult = await discoverOAuthServerInfo(serverUrl, {});
  
  const authProvider = new NodeOAuthClientProvider({
    serverUrl: discoveryResult.authorizationServerUrl,
    callbackPort: 3000,
    host: "localhost",
    clientName,
    serverUrlHash: serverUrlHash,
    authorizationServerMetadata: discoveryResult.authorizationServerMetadata,
    protectedResourceMetadata: discoveryResult.protectedResourceMetadata,
    wwwAuthenticateScope: discoveryResult.wwwAuthenticateScope
  });

  const client = new Client({ name: clientName, version: "1.0.0" }, { capabilities: {} });

  const authInitializer = async () => {
    const authState = await authCoordinator.initializeAuth();
    if (authState.skipBrowserAuth) {
      console.log("Using cached auth token...");
    }
    return { waitForAuthCode: authState.waitForAuthCode, skipBrowserAuth: authState.skipBrowserAuth };
  };

  const transport = await connectToRemoteServer(client, serverUrl, authProvider, {}, authInitializer, "http-first");
  transport.onerror = (e) => console.error("Transport error:", e);
  console.log("Connected to Webflow MCP successfully!");

  cachedClient = client;
  return client;
}

/**
 * Helper to call a tool on the Webflow MCP server.
 * Automatically handles connection setup and parsing the response data.
 * 
 * @param {string} toolName - e.g., "style_tool", "element_tool", "whtml_builder"
 * @param {Array<Object>} actions - e.g., [{ label: "styles", get_styles: { query: "all" } }]
 * @param {string} context - The context/description of this operation
 * @param {string} siteId - (Optional) The Webflow site ID, defaults to SITE_ID
 * @returns {Promise<any>} The parsed JSON data from the tool's response
 */
export async function callWebflowTool(toolName, actions, context, siteId = SITE_ID) {
  const client = await getWebflowClient();
  
  console.log(`Calling tool: ${toolName}...`);
  const result = await client.callTool(
    { 
      name: toolName, 
      arguments: {
        siteId,
        actions,
        context
      }
    },
    { timeout: 600000 }
  );

  const dataStr = result.content ? result.content[0].text : result.data.content[0].text;
  console.log("Raw Webflow Response:", dataStr);
  return JSON.parse(dataStr);
}
