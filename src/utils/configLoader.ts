import fs from 'fs'

export const loadConfig = (workDir: string) => {
    const file = fs.readFileSync(workDir).toString();
    const config = JSON.parse(file);

    return config;
}