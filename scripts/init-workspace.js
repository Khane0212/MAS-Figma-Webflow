const fs = require('fs');
const path = require('path');

const workspaceDir = path.join(__dirname, '../workspace');
const args = process.argv.slice(2);

let projectName = 'New Project';
let figmaUrl = '';

// Simple arg parsing
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--project' && args[i + 1]) {
    projectName = args[i + 1];
    i++;
  } else if (args[i] === '--figma' && args[i + 1]) {
    figmaUrl = args[i + 1];
    i++;
  }
}

function initWorkspace() {
  console.log('Initializing workspace...');

  // 1. Check if workspace exists, if not create it
  if (!fs.existsSync(workspaceDir)) {
    fs.mkdirSync(workspaceDir, { recursive: true });
  }

  // 2. Create subdirectories for chunking
  const dirsToCreate = ['blueprints', 'contents', 'rawdata'];
  dirsToCreate.forEach(dir => {
    const dirPath = path.join(workspaceDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`Created directory: workspace/${dir}/`);
    } else {
      console.log(`Directory already exists: workspace/${dir}/ (keeping files)`);
    }
  });

  // 3. Create initial files ONLY if they don't exist
  const initialFiles = {
    'meta.json': {
      projectName: projectName,
      figmaUrl: figmaUrl,
      initializedAt: new Date().toISOString()
    },
    'page_structure.json': [],
    'state.json': [],
    'error-logs.json': [],
    'design-system.json': {
      variables: [],
      global_classes: []
    }
  };

  for (const [filename, content] of Object.entries(initialFiles)) {
    const filePath = path.join(workspaceDir, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`Created file: workspace/${filename}`);
    } else {
      console.log(`File already exists: workspace/${filename} (preserving context)`);
    }
  }

  console.log('\n✅ Workspace ready (Knowledge preserved).');
}

initWorkspace();
