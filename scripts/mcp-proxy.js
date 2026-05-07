const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const cacheDir = path.join(process.cwd(), '.cache');

// Ensure the cache directory exists to avoid write errors
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Set MCP_REMOTE_CONFIG_DIR so mcp-remote stores tokens in the project's .cache folder
// rather than globally in ~/.mcp-auth
process.env.MCP_REMOTE_CONFIG_DIR = cacheDir;

// We point to the local mcp-remote installation
const proxyPath = path.join(process.cwd(), 'node_modules', 'mcp-remote', 'dist', 'proxy.js');
const remoteUrl = 'https://mcp.webflow.com/mcp';

console.error(`[MCP Proxy] Starting mcp-remote against ${remoteUrl}`);
console.error(`[MCP Proxy] Tokens will be persistently stored in: ${cacheDir}`);

// We must use stdio: 'inherit' so that the parent process can communicate via stdin/stdout
const child = spawn(process.execPath, [proxyPath, remoteUrl], {
  stdio: 'inherit',
  env: process.env
});

child.on('error', (err) => {
  console.error('[MCP Proxy] Failed to start MCP proxy:', err);
});

child.on('exit', (code) => {
  console.error(`[MCP Proxy] Process exited with code ${code}`);
  process.exit(code || 0);
});
