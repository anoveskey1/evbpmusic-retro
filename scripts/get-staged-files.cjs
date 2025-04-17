// scripts/get-staged-files.cjs
const { execSync } = require('child_process');

try {
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
    .toString()
    .split('\n')
    .filter((file) => /\.(js|jsx|ts|tsx)$/.test(file))
    .map((file) => `'${file}'`);

  if (stagedFiles.length === 0) {
    console.log('');
    process.exit(0);
  }

  console.log(stagedFiles.join(','));
} catch (error) {
  console.error('Error getting staged files:', error);
  process.exit(1);
}