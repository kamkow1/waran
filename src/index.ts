#! /usr/bin/env node
import { Command } from 'commander'
import fs from 'fs'
import { runParse } from './parser/parser'
import clc from 'cli-color'
import inquirer from 'inquirer';

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

        let basicConfig = {};

        inquirer
            .prompt([
                {
                    name: 'name',
                    message: 'name?',
                    default: 'my waran project'
                },
                {
                    name: 'desc',
                    message: 'description?',
                    default: 'no description'
                },
                {
                    name: 'repo',
                    message: 'github repository?',
                    default: ''
                },
                {
                    name: 'author',
                    message: 'authors?',
                    default: ''
                },
            ])
            .then(answers => {
                basicConfig =  {
                    project_info: {
                        proj_name: answers.name,
                        desc: answers.desc,
                        repo: answers.repo,
                        author: answers.author
                    },
                    config: {
                        dirs: {
                            ast_dir: astDir,
                            wrn_proj_dir: waranDir,
                            srcDir: srcDir
                        }
                    },
                    waran: 'https://github.com/kamkow1/waran',
                    authors: 'kamkow1 && londek'
                };

                fs.appendFileSync(wrnProj, JSON.stringify(basicConfig, null, '\t'));

                if (!fs.existsSync(waranDir)){
                    // waran working dir
                    fs.mkdirSync(waranDir);
        
                    // ast dir
                    fs.mkdirSync(astDir);

                    // src dir
                    fs.mkdirSync(srcDir);
                }
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
        console.log(JSON.stringify(code));
        //runLex(code);
        runParse(code, name);
    })


app.parse();