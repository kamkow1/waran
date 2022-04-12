// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var NL: any;
declare var identifier: any;
declare var string: any;
declare var number: any;

const lexer = require("../../lexer/lexer").lexer;

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        (data) => {
            return [data[0]];
        }
            },
    {"name": "statements", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "statement"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
            },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_exec"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "var_assign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                },
    {"name": "func_exec", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "args", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "func_exec",
                func_name: data[0],
                arguments: data[4]
            }
        }
            },
    {"name": "func_exec", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "func_exec",
                func_name: data[0],
                arguments: []
            }
        }
            },
    {"name": "args", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "args", "symbols": ["args", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"]}
  ],
  ParserStart: "statements",
};

export default grammar;
