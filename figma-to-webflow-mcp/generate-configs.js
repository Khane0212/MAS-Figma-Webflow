const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const config = JSON.parse(fs.readFileSync('./mcp-servers.json', 'utf8'));

const outputs = {
  'opencode.json': {
    $schema: "https://opencode.ai/config.json",
    instructions: ["figma-to-webflow-mcp/INSTRUCTIONS.md"],
    ...config.agents.opencode?.content
  },
  'claude.json': config.agents['claude-desktop']?.content,
  'mcp.json': config.agents.vscode?.content,
  'gemini-settings.json': config.agents['gemini-cli']?.content
};

function copyFile(src, dest) {
  try {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const existing = fs.readFileSync(dest, 'utf8');
    const existingConfig = JSON.parse(existing);
    const newConfig = JSON.parse(fs.readFileSync(src, 'utf8'));
    const merged = { ...existingConfig, ...newConfig };
    fs.writeFileSync(dest, JSON.stringify(merged, null, 2));
    console.log(`✅ Updated: ${dest}`);
  } catch (e) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied: ${dest}`);
  }
}

console.log('🎯 Generating configs...\n');

Object.entries(outputs).forEach(([filename, content]) => {
  if (content) {
    fs.writeFileSync(filename, JSON.stringify(content, null, 2));
    console.log(`✅ Generated: ${filename}`);
  }
});

console.log('\n📦 Auto-installing to agents...\n');

const homeDir = os.homedir();

const agents = [
  {
    name: 'gemini-cli',
    src: 'gemini-settings.json',
    dest: path.join(homeDir, '.gemini', 'settings.json')
  },
  {
    name: 'claude-desktop',
    src: 'claude.json',
    dest: path.join(homeDir, 'AppData', 'Roaming', 'Claude', 'claude.json')
  },
  {
    name: 'vscode',
    src: 'mcp.json',
    dest: path.join(homeDir, 'AppData', 'Roaming', 'Code', 'User', 'mcp.json')
  }
];

agents.forEach(agent => {
  try {
    if (fs.existsSync(agent.src)) {
      copyFile(agent.src, agent.dest);
    }
  } catch (e) {
    console.log(`⚠️ ${agent.name}: ${e.message}`);
  }
});

console.log('\n✅ Done! Restart your agent to use.');
console.log('\n📋 Manual Setup (if auto-failed):');
console.log('Claude Code: claude mcp add --transport http figma https://mcp.figma.com/mcp');
console.log('Cursor: /add-plugin figma');
console.log('Codex: codex mcp add figma --url https://mcp.figma.com/mcp');