const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('f:/teachothersonline/app');
files.forEach(f => {
    if(f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.ts') || f.endsWith('.tsx')) {
        let content = fs.readFileSync(f, 'utf8');
        const updated = content.replace(/\/\/ TODO: Cache Components adoption[\s\S]*?export const instant = false;\n?/g, '');
        if(content !== updated) {
            fs.writeFileSync(f, updated);
            console.log('Updated', f);
        }
    }
});
