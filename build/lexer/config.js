"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    WS: /[ \t]+/,
    Comment: /\/\/.*?$/,
    Number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    lbrace: '{',
    rbrace: '}',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    arrow: '->',
    assign: '=',
    nl: {
        match: /\r?\n/,
        lineBreaks: true
    }
};
