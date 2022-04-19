import moo from 'moo'

export const lexer = moo.compile({
    use:            'import',
    _else:          'else',
    _break:         'break',
    _continue:      'continue',
    inc_dec:        /\++|\--/,
    increment:      '++',
    decrement:      '--',
    _for:           'for',
    _while:         'while',
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
    //number:         /0|[1-9][0-9]*/,
    number:         /[+-]?\d+(?:\.\d+)?/,
    string:         /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:         '(',
    rparen:         ')',
    lbrace:         '{',
    rbrace:         '}',
    l_sqbr:         '[',
    r_sqbr:         ']',
    identifier:     /[a-zA-Z][a-zA-Z_0-9]*/,
    //identifier:     /[a-zA-Z][a-zA-Z_0-9][^and][^or][^is][^not]*/,
    arrow:          '->',
    assign:         ':=',
    luse:           '<',
    ruse:           '>',
    pipe:           '|'
});