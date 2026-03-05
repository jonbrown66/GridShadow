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

    content = content.replace(/bg-black\/40/g, 'bg-white dark:bg-black/40');
    content = content.replace(/bg-black\/60/g, 'bg-white/80 dark:bg-black/60');
    content = content.replace(/bg-black\/80/g, 'bg-white dark:bg-black/80');

    // Careful with hover:bg-black so we don't mess up hover:bg-black/xx
    content = content.replace(/hover:bg-black(?!\/)/g, 'hover:bg-white dark:hover:bg-black');

    // Careful with bg-black so we don't mess up bg-black/xx
    content = content.replace(/(?<!:)bg-black(?!\/)/g, 'bg-white dark:bg-black');

    // Also fix browser-shell from previous tailwind.css if needed, but we already fixed it in css.

    // Let's replace bg-muted/20 with bg-black/5 dark:bg-white/5 to make it cleaner in Light mode
    content = content.replace(/bg-muted\/20/g, 'bg-black/5 dark:bg-white/10');
    content = content.replace(/bg-muted\/10/g, 'bg-black/5 dark:bg-white/5');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});
