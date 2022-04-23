#! /usr/bin/env node
import { Command } from 'commander'
import fs, { fchownSync } from 'fs'
import { runParse } from './parser/parser'
import clc from 'cli-color'
import inquirer from 'inquirer'
import questions from './cli/cmd/init/questions'
import { createDirConfig, createInfo, createProjectConfig } from './cli/cmd/init/config' 
import { setupDirs, setupConfigJson } from './cli/cmd/init/dirSetup'
import { loadConfig } from './utils/configLoader'
import { generate } from './generator/generator'
import { ChildProcess, exec, spawn } from 'child_process'
import UglifyJS from 'uglify-js'
import path from 'path'
import os from 'os'
import { template } from './utils/template'

const app = new Command();


const initPath          = process.cwd();
const waranDir          = path.join(initPath, '.waran');
const astDir            = path.join(waranDir, 'ast');
const wrnProj           = path.join(initPath, 'wrn_proj.json');
const srcDir            = path.join(initPath, 'src');
const build             = path.join(waranDir, 'build');
const mainFile          = path.join(srcDir, 'main.wr');
const runtimeDir        = path.join(waranDir, 'runtime');
const libDir            = path.join(runtimeDir, 'libs');

app.name('wrn');

app
    .command('init')
    .action(() => {
        if (fs.existsSync(wrnProj)) 
            return console.log(clc.redBright(`${wrnProj}\na waran project already exists in this directory!`));

        inquirer
            .prompt(questions)
            .then(answers => {
                const info = createInfo(answers);  
                const dirs = createDirConfig(astDir, waranDir, srcDir, build);
                const config = createProjectConfig(info, dirs);    
                
                setupDirs(waranDir, astDir, srcDir, build);
                setupConfigJson(wrnProj, config);

                fs.mkdirSync(runtimeDir);
                fs.mkdirSync(libDir);

                const runningOs = os.platform().toString();
                const pathToPs1Init = path.resolve(__dirname, '../init.ps1');
                const pathToShInit = path.resolve(__dirname, '../init.sh');

                let init: ChildProcess;

                switch (runningOs) {
                    case 'win32':
                        init = exec(`${pathToPs1Init} ${build}`, {'shell':'powershell.exe'});
                        break;
                
                    case 'linux':
                        init = exec(`${pathToShInit} ${build}`, {'shell':'bash'});
                        break; 
                }

                init.on('exit', () => {
                    let packageConfig = JSON.parse(fs.readFileSync(path.resolve(build, 'package.json')).toString());
                    packageConfig.main = 'main.js';
                    packageConfig.scripts.start = 'node ./main.js';

                    fs.writeFileSync(path.resolve(build, 'package.json'), JSON.stringify(packageConfig, null, 4));

                    console.info('created directories successfully');
                });

                console.info('installing dependencies...');

                const libs = fs.readdirSync(path.join(__dirname, '/runtime/libs/'));

                for(let lib of libs) {
                    const libPath = path.join(__dirname, '/runtime/libs/', lib);
                    const libCode = fs.readFileSync(libPath).toString();
                    fs.appendFileSync(path.join(libDir, lib), libCode);
                }

                fs.appendFileSync(mainFile, template);

                console.info('created project successfully!\nenjoy coding!');
            });
    });

app
    .command('compile')
    .option('-p, --path [pathStr]')
    .action(data => {
        if (data.path === undefined) {
            data.path = "src/main.wr";
        }
        const name = path.basename(data.path);

        if (!name.includes('.wr'))
            return console.error('file extension not recognized! only .wr files can be compiled');

        const code = fs.readFileSync(data.path).toString();

        const ast = runParse(code);

        const { config } = loadConfig(path.join(initPath, 'wrn_proj.json'));

        const astDir = config.dirs.ast_dir;
        const outputFile = path.join(astDir, name.replace('.wr', '.ast'));

        fs.writeFileSync(outputFile, JSON.stringify(ast, null, '\t'));

        const js =  generate(ast);
        const minifiedJs = UglifyJS.minify(js).code;

        const buildDir = config.dirs.build;
        const buildFile = path.join(buildDir, name.replace('.wr', '.js'));

        fs.writeFileSync(buildFile, minifiedJs);
    })

app
    .command('exec')
    .argument('<string>', 'path to .js file')
    .action(path => {
        spawn(`node`, [path], {
            stdio: [0, process.stdout, 'pipe'] //[0, 'pipe']
        });
    })


app.parse();