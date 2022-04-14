import fs from 'fs'

export const loadConfig = (pathStr: string) => {
    const file = fs.readFileSync(pathStr).toString();
    const config = JSON.parse(file);

    return config;
}