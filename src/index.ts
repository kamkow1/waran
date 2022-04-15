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
import { exec, spawn } from 'child_process'
import UglifyJS from 'uglify-js'
import path from 'path'

const app = new Command();


const initPath          = process.cwd();
const waranDir          = path.join(initPath, '.waran');
const astDir            = path.join(waranDir, 'ast');
const wrnProj           = path.join(initPath, 'wrn_proj.json');
const srcDir            = path.join(initPath, 'src');
const build             = path.join(waranDir, 'build');
const mainFile          = path.join(srcDir, 'main.wr');
const runtimeDir        = path.join(waranDir, 'runtime');
const runtimeFilePath   = path.join(runtimeDir, 'index.js');

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
                const runtimePath = path.join(__dirname, '/runtime/index.js');
                const runtime = fs.readFileSync(runtimePath).toString();
                fs.appendFileSync(runtimeFilePath, runtime);

                fs.appendFileSync(mainFile, 'hello = "hello"\nwaran="waran!"\nstd_out(hello waran)');
            });
    });

app
    .command('compile')
    .argument('<string>', 'path to .wr file')
    .action(pathStr => {
        const name = path.basename(pathStr);

        if (!name.includes('.wr'))
            return console.error('file extension not recognized! only .wr files can be compiled');

        const code = fs.readFileSync(pathStr).toString();

        const ast = runParse(code);

        const { config } = loadConfig(path.join(initPath, 'wrn_proj.json'));

        const astDir = config.dirs.ast_dir;
        const outputFile = path.join(astDir, name.replace('.wr', '.ast'));

        fs.writeFileSync(outputFile, JSON.stringify(ast, null, '\t'));

        const runtime = fs.readFileSync(runtimeFilePath).toString();
        const js =  generate(ast) + runtime;
        const minifiedJs = UglifyJS.minify(js).code;

        const buildDir = config.dirs.build;
        const buildFile = path.join(buildDir, name.replace('.wr', '.js'));

        fs.writeFileSync(buildFile, minifiedJs);
    })

app
    .command('exec')
    .argument('<string>', 'path to .js file')
    .action(path => {
        /*let subProcess = spawn(`node ${path}`, (err, stdout, stderr) => {
            if (err)
                return console.log(clc.redBright(err));

            console.log(clc.yellow('waran: \n'));
            console.log(clc.greenBright(stdout));
        });*/
        spawn(`node`, [path], {
            stdio: [0, process.stdout, 'pipe'] //[0, 'pipe']
        });
    })


app.parse();