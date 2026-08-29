import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';

// ANSI colors for clean log separation
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(prefix, color, data) {
  const lines = data.toString().split(/\r?\n/);
  for (const line of lines) {
    if (line.trim()) {
      console.log(`${color}[${prefix}]${colors.reset} ${line}`);
    }
  }
}

console.log(`${colors.green}========================================${colors.reset}`);
console.log(`${colors.green}  Starting Hammad's Portfolio & Chatbot ${colors.reset}`);
console.log(`${colors.green}========================================${colors.reset}\n`);

// 1. Start Python Backend (FastAPI on port 8000)
const backendDir = path.join(__dirname, 'Backend');
const backendCmd = isWindows ? 'python main.py' : 'python3 main.py';
const backendProcess = spawn(backendCmd, {
  cwd: backendDir,
  shell: true,
  env: { ...process.env, PYTHONUNBUFFERED: '1' },
});

backendProcess.stdout.on('data', (data) => log('Backend', colors.magenta, data));
backendProcess.stderr.on('data', (data) => log('Backend', colors.magenta, data));

backendProcess.on('error', (err) => {
  console.error(`${colors.red}[Backend Error]${colors.reset} Failed to start backend:`, err.message);
});

// 2. Start Frontend (Vite)
const frontendDir = path.join(__dirname, 'Frontend');
const frontendCmd = isWindows ? 'npm.cmd run dev' : 'npm run dev';
const frontendProcess = spawn(frontendCmd, {
  cwd: frontendDir,
  shell: true,
});

frontendProcess.stdout.on('data', (data) => log('Frontend', colors.cyan, data));
frontendProcess.stderr.on('data', (data) => log('Frontend', colors.cyan, data));

frontendProcess.on('error', (err) => {
  console.error(`${colors.red}[Frontend Error]${colors.reset} Failed to start frontend:`, err.message);
});

// Clean shutdown on Ctrl+C or process exit
const cleanup = () => {
  console.log(`\n${colors.yellow}Shutting down servers...${colors.reset}`);
  try {
    if (isWindows) {
      if (backendProcess.pid) spawn(`taskkill /pid ${backendProcess.pid} /f /t`, { shell: true });
      if (frontendProcess.pid) spawn(`taskkill /pid ${frontendProcess.pid} /f /t`, { shell: true });
    } else {
      backendProcess.kill('SIGINT');
      frontendProcess.kill('SIGINT');
    }
  } catch {
    // Ignore cleanup errors
  }
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
