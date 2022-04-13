#! /usr/bin/env node
import { Command } from 'commander'
import fs from 'fs'
import { runParse } from './parser/parser'
import clc from 'cli-color'
import inquirer from 'inquirer'
import questions from './cli/cmd/init/questions'
import { createDirConfig, createInfo, createProjectConfig } from './cli/cmd/init/config' 
import { setupDirs, setupConfigJson } from './cli/cmd/init/dirSetup'
import { loadConfig } from './utils/configLoader'
import { generate } from './generator/generator'
import { exec } from 'child_process'

const app = new Command();

let initPath: string = process.cwd();
let waranDir: string
let astDir: string
let wrnProj: string;
let srcDir: string;
let build: string;

app.name('wrn');

app
    .command('init')
    .action(() => {
        waranDir = initPath + '/.waran';
        astDir = waranDir + '/ast';
        wrnProj = initPath + '/wrn_proj.json';
        srcDir = initPath + '/src';
        build = waranDir + '/build';


        if (fs.existsSync(wrnProj)) {
            console.log(clc.redBright(`${wrnProj} \na waran project already exists in this directory!`));
            process.exit(1);
        }

        inquirer
            .prompt(questions)
            .then(answers => {
                const info = createInfo(answers);  
                const dirs = createDirConfig(astDir, waranDir, srcDir, build);
                const config = createProjectConfig(info, dirs);    
                
                setupDirs(waranDir, astDir, srcDir, build);
                setupConfigJson(wrnProj, config);
            });
    });

app
    .command('compile')
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
                console.error('file extension not recognized! only .wr files are executable');
                return;
            }
        }

        const code = fs.readFileSync(path).toString();
        const ast = runParse(code);

        const configuration = loadConfig(initPath + '/wrn_proj.json');

        const outputFile = configuration.config.dirs.ast_dir + '/' + name.replace('.wr', '.ast');

        fs.writeFileSync(outputFile, JSON.stringify(ast, null, '\t'));

        const js =  generate(ast);

        console.log(configuration.config.dirs.build + '/' + name.replace('.wr', '.js'));

        fs.writeFileSync(configuration.config.dirs.build + '/' + name.replace('.wr', '.js'), js);
    })

app
    .command('exec')
    .argument('<string>', 'path to .js file')
    .action((str) => {
        let path = str;

        exec(`node ${path}`, (err: any | null, stdout: string, stderr: string) => {
            if (err) {
                console.log(clc.redBright(err));
                process.exit(1);
            }

            console.log(clc.yellow('> output'));
            console.log(clc.greenBright(stdout));
        });        
    })


app.parse();