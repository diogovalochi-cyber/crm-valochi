import fs from 'fs';
import path from 'path';

const logPath = 'C:\\Users\\diogo.freitas\\.gemini\\antigravity\\brain\\67c38086-6391-4ee6-a422-fdffbfb0f858\\.system_generated\\logs\\transcript.jsonl';
const urls = new Set();

try {
  const content = fs.readFileSync(logPath, 'utf8');
  const matches = content.match(/[a-zA-Z0-9-]+\.netlify\.app/g);
  if (matches) {
    matches.forEach(m => urls.add(m));
  }
} catch (e) {
  console.log("Error:", e);
}

console.log("Found Netlify URLs:");
Array.from(urls).sort().forEach(u => {
  console.log(`https://${u}`);
});
