#! /usr/bin/env node
import { Command } from 'commander'
import fs from 'fs'
import { runParse } from './parser/parser'
import clc from 'cli-color'
import inquirer from 'inquirer'
import questions from './cli/cmd/init/questions'
import { createDirConfig, createInfo, createProjectConfig } from './cli/cmd/init/config' 
import { setupDirs, setupConfigJson } from './cli/cmd/init/dirSetup'

const app = new Command();

app.name('wrn');

app
    .command('init')
    .action(() => {
        const initPath = process.cwd();
        const waranDir = initPath + '/.waran';
        const astDir = waranDir + '/ast';
        const wrnProj = initPath + '/wrn_proj.json';
        const srcDir = initPath + '/src';

        if (fs.existsSync(wrnProj)) {
            console.log(clc.redBright(`${wrnProj} \na waran project already exists in this directory!`));
            process.exit(1);
        }

        inquirer
            .prompt(questions)
            .then(answers => {
                const info = createInfo(answers);  
                const dirs = createDirConfig(astDir, waranDir, srcDir);
                const config = createProjectConfig(info, dirs);    
                
                setupDirs(waranDir, astDir, srcDir);
                setupConfigJson(wrnProj, config);
            });
    });

app
    .command('exec')
    .argument('<string>', 'path to .wr file')
    .action((str) => {
        let path = str;

        const pathElements = str.split('/');
        const name = pathElements[pathElements.length - 1];

        if (!name.includes('.wr')) {

            const pathWithIndex = path + '/index.wr';
            console.log(pathWithIndex);

            if (fs.existsSync(pathWithIndex)) {
                path = pathWithIndex;
            } else {
                console.error('file extension not recognized! only .ks files are executable');
                return;
            }
        }

        const code = fs.readFileSync(path).toString();
        runParse(code, name);
    })


app.parse();