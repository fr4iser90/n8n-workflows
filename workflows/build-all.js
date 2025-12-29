#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Build all workflows in the workflows directory
 */
function buildAllWorkflows() {
  console.log('🚀 Building all workflows...\n');

  // Auto-detect: Sind wir in workflows/ oder im Hauptverzeichnis?
  const currentDir = path.basename(__dirname);
  let workflowsDir;

  if (currentDir === 'workflows') {
    // Wir sind in workflows/ - suche Unterordner
    workflowsDir = __dirname;
  } else {
    // Wir sind im Hauptverzeichnis - suche workflows/
    workflowsDir = path.join(__dirname, 'workflows');
  }

  if (!fs.existsSync(workflowsDir)) {
    console.error('❌ Workflows directory not found:', workflowsDir);
    process.exit(1);
  }

  // Get all workflow directories
  const workflowDirs = fs.readdirSync(workflowsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (workflowDirs.length === 0) {
    console.log('ℹ️  No workflow directories found');
    return;
  }

  console.log(`📂 Found ${workflowDirs.length} workflow(s): ${workflowDirs.join(', ')}\n`);

  let successCount = 0;
  let failCount = 0;

  // Build each workflow
  for (const workflowDir of workflowDirs) {
    const workflowPath = path.join(workflowsDir, workflowDir);
    const buildScript = path.join(workflowPath, 'build.js');

    if (!fs.existsSync(buildScript)) {
      console.log(`⚠️  Skipping ${workflowDir} - no build.js found`);
      continue;
    }

    try {
      console.log(`🔨 Building ${workflowDir}...`);
      execSync(`cd "${workflowPath}" && node build.js`, {
        stdio: 'inherit',
        timeout: 30000
      });
      console.log(`✅ ${workflowDir} built successfully\n`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to build ${workflowDir}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n🎉 Build summary:`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Total: ${workflowDirs.length}`);

  if (failCount > 0) {
    console.log('\n🔍 Check the error messages above for details');
    process.exit(1);
  } else {
    console.log('\n🎊 All workflows built successfully!');
  }
}

/**
 * Clean all built workflow files
 */
function cleanBuiltWorkflows() {
  console.log('🧹 Cleaning built workflow files...');

  const files = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('-built.json'));

  if (files.length === 0) {
    console.log('ℹ️  No built files to clean');
    return;
  }

  files.forEach(file => {
    fs.unlinkSync(path.join(__dirname, file));
    console.log(`🗑️  Removed: ${file}`);
  });

  console.log(`\n✅ Cleaned ${files.length} file(s)`);
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
🛠️  n8n Workflow Builder

Usage:
  node build-all.js [command]

Commands:
  build    Build all workflows (default)
  clean    Remove all built workflow files
  help     Show this help

Examples:
  node build-all.js build
  node build-all.js clean

Workflow Structure:
  workflows/
    ├── my-workflow/
    │   ├── config.json          # Workflow configuration
    │   ├── scripts/             # JavaScript files
    │   │   ├── script1.js
    │   │   └── script2.js
    │   ├── sticky-notes/        # Documentation files
    │   │   ├── overview.md
    │   │   └── credentials.md
    │   └── build.js             # Build script for this workflow
    └── ...

Built files will be created in the root directory with '-built.json' suffix.
`);
}

// Main execution
const command = process.argv[2] || 'build';

switch (command) {
  case 'build':
    buildAllWorkflows();
    break;
  case 'clean':
    cleanBuiltWorkflows();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "node build-all.js help" for available commands');
    process.exit(1);
}
