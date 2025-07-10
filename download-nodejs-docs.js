const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const NODE_VERSION = '20.11.0'; // You can change this to your preferred version
const DOCS_URL = `https://nodejs.org/dist/v${NODE_VERSION}/docs/api/all.json`;
const DOWNLOAD_DIR = path.join(__dirname, 'docs', 'nodejs');
const TEMP_FILE = path.join(__dirname, 'nodejs-docs-temp.zip');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file if download failed
      reject(err);
    });
  });
}

async function extractZip(zipPath, extractPath) {
  return new Promise((resolve, reject) => {
    try {
      // Use PowerShell to extract on Windows
      const command = `powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '${extractPath}' -Force"`;
      execSync(command, { stdio: 'inherit' });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

async function main() {
  try {
    console.log('🚀 Starting Node.js documentation download...');
    
    // Create docs directory if it doesn't exist
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
      console.log('✅ Created docs directory');
    }

    // Get the latest Node.js version if not specified
    let nodeVersion = NODE_VERSION;
    if (NODE_VERSION === 'latest') {
      console.log('📡 Fetching latest Node.js version...');
      const response = await fetch('https://nodejs.org/dist/index.json');
      const versions = await response.json();
      nodeVersion = versions[0].version;
      console.log(`📦 Latest version: ${nodeVersion}`);
    }

    // Construct download URL for HTML docs
    const downloadUrl = `https://nodejs.org/dist/v${nodeVersion}/docs/api/all.json`;
    
    console.log(`📥 Downloading Node.js ${nodeVersion} documentation...`);
    console.log(`🔗 URL: ${downloadUrl}`);
    
    // Download the documentation
    await downloadFile(downloadUrl, path.join(DOWNLOAD_DIR, 'all.json'));
    
    console.log('✅ Download completed!');
    console.log(`📁 Documentation saved to: ${DOWNLOAD_DIR}`);
    console.log('\n📖 To view the documentation:');
    console.log(`   1. Open: ${path.join(DOWNLOAD_DIR, 'all.json')}`);
    console.log('   2. Or use a JSON viewer to browse the API documentation');
    
    // Create a simple HTML viewer
    const htmlViewer = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js Documentation Viewer</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .search { margin-bottom: 20px; }
        #searchInput { width: 300px; padding: 8px; }
        .module { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
        .module h3 { margin-top: 0; color: #333; }
        .method { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 3px; }
        .method h4 { margin: 0 0 5px 0; color: #666; }
        .description { color: #555; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Node.js Documentation Viewer</h1>
        <div class="search">
            <input type="text" id="searchInput" placeholder="Search modules and methods...">
        </div>
        <div id="content"></div>
    </div>
    
    <script>
        fetch('./all.json')
            .then(response => response.json())
            .then(data => {
                const content = document.getElementById('content');
                const searchInput = document.getElementById('searchInput');
                
                function renderModules(modules) {
                    content.innerHTML = '';
                    Object.keys(modules).forEach(moduleName => {
                        const module = modules[moduleName];
                        const moduleDiv = document.createElement('div');
                        moduleDiv.className = 'module';
                        moduleDiv.innerHTML = \`
                            <h3>\${moduleName}</h3>
                            <div class="description">\${module.description || 'No description available'}</div>
                        \`;
                        
                        if (module.methods) {
                            Object.keys(module.methods).forEach(methodName => {
                                const method = module.methods[methodName];
                                const methodDiv = document.createElement('div');
                                methodDiv.className = 'method';
                                methodDiv.innerHTML = \`
                                    <h4>\${methodName}</h4>
                                    <div class="description">\${method.description || 'No description available'}</div>
                                \`;
                                moduleDiv.appendChild(methodDiv);
                            });
                        }
                        
                        content.appendChild(moduleDiv);
                    });
                }
                
                renderModules(data);
                
                searchInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filteredModules = {};
                    
                    Object.keys(data).forEach(moduleName => {
                        const module = data[moduleName];
                        if (moduleName.toLowerCase().includes(searchTerm) || 
                            (module.description && module.description.toLowerCase().includes(searchTerm))) {
                            filteredModules[moduleName] = module;
                        }
                    });
                    
                    renderModules(filteredModules);
                });
            })
            .catch(error => {
                document.getElementById('content').innerHTML = '<p>Error loading documentation: ' + error.message + '</p>';
            });
    </script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(DOWNLOAD_DIR, 'index.html'), htmlViewer);
    console.log(`🌐 HTML viewer created: ${path.join(DOWNLOAD_DIR, 'index.html')}`);
    
    console.log('\n🎉 Setup complete! You can now:');
    console.log(`   1. Open ${path.join(DOWNLOAD_DIR, 'index.html')} in your browser`);
    console.log('   2. Search and browse the Node.js API documentation offline');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main(); 