const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const workspaceDir = path.join(__dirname, '../workspace');
const archivesDir = path.join(__dirname, '../archives');

async function archiveWorkspace() {
  if (!fs.existsSync(workspaceDir)) {
    console.log('Workspace directory does not exist. Nothing to archive.');
    return;
  }

  // Ensure archives directory exists
  if (!fs.existsSync(archivesDir)) {
    fs.mkdirSync(archivesDir, { recursive: true });
  }

  let projectName = 'unknown_project';
  const metaPath = path.join(workspaceDir, 'meta.json');
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      projectName = meta.projectName ? meta.projectName.replace(/[^a-zA-Z0-9-_]/g, '_') : 'unknown_project';
    } catch (e) {
      console.log('Could not read meta.json, using default project name.');
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveName = `${projectName}_${timestamp}.zip`;
  const archivePath = path.join(archivesDir, archiveName);

  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`\nWorkspace successfully archived to: ${archivePath} (${archive.pointer()} total bytes)`);
      
      // Wipe the workspace directory cleanly
      console.log('Cleaning up workspace directory...');
      fs.rmSync(workspaceDir, { recursive: true, force: true });
      fs.mkdirSync(workspaceDir); // Recreate empty root
      console.log('Workspace wiped. Ready for init-workspace.');
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Append files from a sub-directory, putting its contents at the root of archive
    archive.directory(workspaceDir, false);
    archive.finalize();
  });
}

archiveWorkspace().catch(console.error);
