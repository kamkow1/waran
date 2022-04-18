import moo from 'moo'

export const lexer = moo.compile({
    _else:           'else',
    func:           'func',
    _bool:          /true|false/,
    or:             '||',
    and:            '&&',
    not_is:         '!=',
    is:             '==',
    not:            '!',
    NL:             { match: /[\r\n]+/, lineBreaks: true },
    WS:             /[ \t]+/,
    comment:        /\#\#.*?$/,
    ml_comment:     /#\*\r?\n(?:(?:.+)\r?\n)+\*#/,
    number:         /0|[1-9][0-9]*/,
    string:         /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:         '(',
    rparen:         ')',
    lbrace:         '{',
    rbrace:         '}',
    identifier:     /[a-zA-Z][a-zA-Z_0-9]*/,
    //identifier:     /[a-zA-Z][a-zA-Z_0-9][^and][^or][^is][^not]*/,
    arrow:          '->',
    assign:         ':=',
    use:            '~',
    luse:           '<',
    ruse:           '>',
});