import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.tsx')) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(path.join(__dirname, 'src'), (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/hover:text-white/g, 'hover:text-foreground');
    content = content.replace(/group-hover:text-white/g, 'group-hover:text-foreground');
    content = content.replace(/hover:border-white\/30/g, 'hover:border-black/30 dark:hover:border-white/30');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});
