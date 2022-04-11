#! /usr/bin/env node

import { runLex } from './lexer/lexer'
import { Command } from 'commander'
import fs from 'fs'
import { runParse } from './parser/parser'

const app = new Command();

app.name('wrn');

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
        //runLex(code);
        runParse(code);
    })


app.parse();