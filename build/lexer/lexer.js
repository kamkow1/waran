"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLex = void 0;
const moo_1 = __importDefault(require("moo"));
const config_1 = require("./config");
const lexer = moo_1.default.compile(config_1.config);
//lexer.reset('abc = 6');
const runLex = (code) => {
    lexer.reset(code);
    while (true) {
        const token = lexer.next();
        if (!token) {
            break;
        }
        console.log(token);
    }
};
exports.runLex = runLex;
