export const config = {
    WS: /[ \t]+/,
    Comment: /\/\/.*?$/,
    Number:  /0|[1-9][0-9]*/,
    string:  /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:  '(',
    rparen:  ')',
    lbrace: '{',
    rbrace: '}',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    arrow: '->',
    assign: '=',
    NL: { 
        match: /\n/, 
        lineBreaks: true
    }
};