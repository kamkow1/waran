#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer/lexer");
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const app = new commander_1.Command();
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
        if (fs_1.default.existsSync(pathWithIndex)) {
            path = pathWithIndex;
        }
        else {
            console.error('file extension not recognized! only .ks files are executable');
            return;
        }
    }
    const code = fs_1.default.readFileSync(path).toString();
    (0, lexer_1.runLex)(code);
});
app.parse();
