// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var NL: any;
declare var comment: any;
declare var ml_comment: any;
declare var use: any;
declare var luse: any;
declare var identifier: any;
declare var ruse: any;
declare var assign: any;
declare var string: any;
declare var number: any;
declare var func: any;
declare var and: any;
declare var or: any;
declare var not: any;
declare var is: any;
declare var not_is: any;
declare var _else: any;
declare var WS: any;

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
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) => {
            return [data[1]];
        }
            },
    {"name": "statements", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", "statement", "_"], "postprocess": 
        (data) => {
            return [...data[0], data[3]];
        }
            },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_exec"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("ml_comment") ? {type: "ml_comment"} : ml_comment)], "postprocess": id},
    {"name": "statement", "symbols": ["use_mod"], "postprocess": id},
    {"name": "statement", "symbols": ["if"], "postprocess": id},
    {"name": "statement", "symbols": ["else"], "postprocess": id},
    {"name": "use_mod", "symbols": [(lexer.has("use") ? {type: "use"} : use), "_", (lexer.has("luse") ? {type: "luse"} : luse), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("ruse") ? {type: "ruse"} : ruse)], "postprocess": 
        (data) => {
            return {
                type: "use_mod",
                mod_name: data[4]
            }
        }
        },
    {"name": "var_assign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                },
    {"name": "func_exec$ebnf$1$subexpression$1", "symbols": [{"literal":"await"}]},
    {"name": "func_exec$ebnf$1", "symbols": ["func_exec$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_exec$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "func_exec$ebnf$2$subexpression$1", "symbols": ["args", "_"]},
    {"name": "func_exec$ebnf$2", "symbols": ["func_exec$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "func_exec$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "func_exec", "symbols": ["func_exec$ebnf$1", "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "func_exec$ebnf$2", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "func_exec",
                hasAwait: data[0] ? true : false,
                func_name: data[2],
                arguments: data[6] ? data[6][0] : []
            }
        }
            },
    {"name": "func_exec$ebnf$3$subexpression$1", "symbols": [{"literal":"await"}]},
    {"name": "func_exec$ebnf$3", "symbols": ["func_exec$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "func_exec$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "func_exec", "symbols": ["func_exec$ebnf$3", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", {"literal":")"}], "postprocess": 
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
    {"name": "expr", "symbols": ["statement"], "postprocess": id},
    {"name": "expr", "symbols": ["lambda"], "postprocess": id},
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["params", "_"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "lambda", "symbols": [(lexer.has("func") ? {type: "func"} : func), "_", {"literal":"("}, "_", "lambda$ebnf$1", {"literal":")"}, "_", {"literal":"->"}, "_", "lambda_body"], "postprocess": 
        (data) => {
            return {
                type: "lambda",
                parameters: data[4] ? data[4][0] : [],
                body: data[9]
            }
        }
        },
    {"name": "params", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return [data[0]];
        }
            },
    {"name": "params", "symbols": ["params", "__", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
            },
    {"name": "lambda_body", "symbols": ["expr"], "postprocess":  
        (data) => {
            return [data[0]];
        }
        
             },
    {"name": "lambda_body", "symbols": [{"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return data[3];
        }
            },
    {"name": "operator", "symbols": [(lexer.has("and") ? {type: "and"} : and)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("or") ? {type: "or"} : or)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("not") ? {type: "not"} : not)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("is") ? {type: "is"} : is)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("not_is") ? {type: "not_is"} : not_is)], "postprocess": id},
    {"name": "if$ebnf$1$subexpression$1", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "if$ebnf$1", "symbols": ["if$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "if$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "if$ebnf$2$subexpression$1", "symbols": ["else"]},
    {"name": "if$ebnf$2", "symbols": ["if$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "if$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "if", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "if_expr", "_", {"literal":")"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "if$ebnf$1", {"literal":"}"}, "_", "if$ebnf$2"], "postprocess": 
        (data) => {
            return {
                type: "if",
                bexpr: data[4],
                body: data[12] ? data[12][0] : []
            }
        }
        },
    {"name": "else$ebnf$1$subexpression$1", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "else$ebnf$1", "symbols": ["else$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "else$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "else", "symbols": [(lexer.has("_else") ? {type: "_else"} : _else), "_", (lexer.has("NL") ? {type: "NL"} : NL), {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "else$ebnf$1", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "else",
                body: data[6] ? data[6][0] : []
            }
        }
        },
    {"name": "if_expr", "symbols": ["expr", "_", "operator", "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "if_expr",
                left: data[0],
                op: data[2],
                right: data[4]
            }
        }
        },
    {"name": "NL$ebnf$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "NL$ebnf$1", "symbols": ["NL$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "NL", "symbols": ["NL$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"]}
  ],
  ParserStart: "statements",
};

export default grammar;
