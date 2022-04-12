import fs from 'fs'

export const setupDirs = (
    waranDir: string, 
    astDir: string, 
    srcDir: string) => {

    fs.mkdirSync(waranDir);
    fs.mkdirSync(astDir);
    fs.mkdirSync(srcDir);
}

export const setupConfigJson = (path: string, content: object) => {
    fs.appendFileSync(path, JSON.stringify(content, null, '\t'));  
}