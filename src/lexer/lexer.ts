import moo from 'moo'

export const lexer = moo.compile({
    NL:             { match: /[\r\n]+/, lineBreaks: true },
    WS:             /[ \t]+/,
    comment:        /\/\/.*?$/,
    number:         /0|[1-9][0-9]*/,
    string:         /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:         '(',
    rparen:         ')',
    lbrace:         '{',
    rbrace:         '}',
    identifier:     /[a-zA-Z][a-zA-Z_0-9]*/,
    arrow:          '->',
    assign:         '='
});