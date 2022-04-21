// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var NL: any;
declare var _private: any;
declare var terminal: any;
declare var _static: any;
declare var field: any;
declare var identifier: any;
declare var assign: any;
declare var _class: any;
declare var dot: any;
declare var prc: any;
declare var comment: any;
declare var ml_comment: any;
declare var _break: any;
declare var _continue: any;
declare var _return: any;
declare var inc_dec: any;
declare var _while: any;
declare var _for: any;
declare var use: any;
declare var at: any;
declare var string: any;
declare var number: any;
declare var _bool: any;
declare var if_expr: any;
declare var _if: any;
declare var _else: any;
declare var l_sqbr: any;
declare var r_sqbr: any;
declare var func: any;
declare var and: any;
declare var or: any;
declare var not: any;
declare var is: any;
declare var not_is: any;
declare var greater: any;
declare var lesser: any;
declare var greater_equal: any;
declare var lesser_equal: any;
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
    {"name": "class_field$ebnf$1$subexpression$1", "symbols": [(lexer.has("_private") ? {type: "_private"} : _private), "_"]},
    {"name": "class_field$ebnf$1", "symbols": ["class_field$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "class_field$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "class_field$ebnf$2$subexpression$1", "symbols": [(lexer.has("terminal") ? {type: "terminal"} : terminal), "_"]},
    {"name": "class_field$ebnf$2", "symbols": ["class_field$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "class_field$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "class_field$ebnf$3$subexpression$1", "symbols": [(lexer.has("_static") ? {type: "_static"} : _static), "_"]},
    {"name": "class_field$ebnf$3", "symbols": ["class_field$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "class_field$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "class_field$ebnf$4$subexpression$1", "symbols": [(lexer.has("assign") ? {type: "assign"} : assign), "_", "expr"]},
    {"name": "class_field$ebnf$4", "symbols": ["class_field$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "class_field$ebnf$4", "symbols": [], "postprocess": () => null},
    {"name": "class_field", "symbols": ["class_field$ebnf$1", "class_field$ebnf$2", "class_field$ebnf$3", (lexer.has("field") ? {type: "field"} : field), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", "class_field$ebnf$4"], "postprocess": 
        (data) => {
            return {
                type: "field",
                terminal: data[1] ? data[1][0] : [],
                private: data[0] ? data[0][0] : [],
                static: data[2] ? data[2][0] : [],
                name: data[5],
                value: data[8] ? data[8][2] : []
            }
        }
        },
    {"name": "class_def$ebnf$1$subexpression$1", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "class_def$ebnf$1", "symbols": ["class_def$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "class_def$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "class_def", "symbols": [(lexer.has("_class") ? {type: "_class"} : _class), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"{"}, (lexer.has("NL") ? {type: "NL"} : NL), "_", "class_def$ebnf$1", {"literal":"}"}, "_"], "postprocess": 
        (data) => {
            return {
                type: "class",
                name: data[2],
                body: data[7] ? data[7][0] : []
            }
        }
        },
    {"name": "obj_prop_ref", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("dot") ? {type: "dot"} : dot), (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return {
                type: "prop_ref",
                obj_name: data[0],
                prop: data[2]
            }
        }
        },
    {"name": "obj_method_ref", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("dot") ? {type: "dot"} : dot), "func_exec"], "postprocess": 
        (data) => {
            return {
                type: "method_call",
                obj_name: data[0],
                method: data[2]
            }
        }
        },
    {"name": "object$ebnf$1$subexpression$1", "symbols": ["properties", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "object$ebnf$1", "symbols": ["object$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "object$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "object", "symbols": [(lexer.has("prc") ? {type: "prc"} : prc), {"literal":"{"}, (lexer.has("NL") ? {type: "NL"} : NL), "_", "object$ebnf$1", {"literal":"}"}, "_"], "postprocess": 
        (data) => {
            return {
                type: "object",
                props: data[4] ? data[4][0] : []
            }
        }
        },
    {"name": "property", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":":"}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "obj_prop",
                name: data[0],
                val: data[4]
            }
        }
        },
    {"name": "properties", "symbols": ["property"], "postprocess": 
        (data) => {
            return [data[0]];
        }
        },
    {"name": "properties", "symbols": ["properties", {"literal":","}, (lexer.has("NL") ? {type: "NL"} : NL), "_", "property"], "postprocess": 
        (data) => {
            return [...data[0], data[4]];
        }
        },
    {"name": "code_block$ebnf$1$subexpression$1", "symbols": ["statements", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "code_block$ebnf$1", "symbols": ["code_block$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "code_block$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "code_block", "symbols": [{"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "code_block$ebnf$1", {"literal":"}"}, "_"], "postprocess": 
        (data) => {
            return {
                type: "code_block",
                body: data[3] ? data[3][0] : []
            }
        }
        },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_exec"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("ml_comment") ? {type: "ml_comment"} : ml_comment)], "postprocess": id},
    {"name": "statement", "symbols": ["use_mod"], "postprocess": id},
    {"name": "statement", "symbols": ["if"], "postprocess": id},
    {"name": "statement", "symbols": ["else"], "postprocess": id},
    {"name": "statement", "symbols": ["for_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["code_block"], "postprocess": id},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["increment_decrement"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("_break") ? {type: "_break"} : _break)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("_continue") ? {type: "_continue"} : _continue)], "postprocess": id},
    {"name": "statement", "symbols": ["return_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["property"], "postprocess": id},
    {"name": "statement", "symbols": ["obj_method_ref"], "postprocess": id},
    {"name": "statement", "symbols": ["obj_prop_ref"], "postprocess": id},
    {"name": "statement", "symbols": ["class_def"], "postprocess": id},
    {"name": "statement", "symbols": ["class_field"], "postprocess": id},
    {"name": "return_statement", "symbols": [(lexer.has("_return") ? {type: "_return"} : _return), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "return_statement",
                returned_val: data[2]
            }
        }
        },
    {"name": "increment_decrement", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("inc_dec") ? {type: "inc_dec"} : inc_dec)], "postprocess": 
        (data) => {
            return {
                type: "increment_decrement",
                name: data[0],
                op: data[1]
            }
        }
        },
    {"name": "condition", "symbols": ["expr", "_", "operator", "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "condition",
                expr1: data[0],
                expr2: data[4],
                sign: data[2]
            }
        }
        },
    {"name": "while_loop", "symbols": [(lexer.has("_while") ? {type: "_while"} : _while), "_", {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_", "statement"], "postprocess": 
        (data) => {
            return {
                type: "while_loop",
                condition: data[4],
                body: data[8]
            }
        }
        },
    {"name": "for_loop", "symbols": [(lexer.has("_for") ? {type: "_for"} : _for), "_", {"literal":"("}, "_", "var_assign", "_", {"literal":"|"}, "_", "expr", "_", {"literal":"|"}, "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("inc_dec") ? {type: "inc_dec"} : inc_dec), "_", {"literal":")"}, "_", "statement"], "postprocess": 
        (data) => {
            return {
                type: "for_loop",
                assignment: data[4],
                loop_condition: data[8],
                var_name: data[12],
                op: data[13],
                body: data[17]
            }
        }
        },
    {"name": "use_mod", "symbols": [(lexer.has("use") ? {type: "use"} : use), "_", (lexer.has("at") ? {type: "at"} : at), (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
            return {
                type: "use_mod",
                mod_name: data[3]
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
    {"name": "var_assign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "if_expr"], "postprocess": 
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
    {"name": "expr", "symbols": [(lexer.has("_bool") ? {type: "_bool"} : _bool)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("if_expr") ? {type: "if_expr"} : if_expr)], "postprocess": id},
    {"name": "expr", "symbols": ["array"], "postprocess": id},
    {"name": "expr", "symbols": ["get_arr_elem"], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["statement"], "postprocess": id},
    {"name": "expr", "symbols": ["lambda"], "postprocess": id},
    {"name": "expr", "symbols": ["condition"], "postprocess": id},
    {"name": "expr", "symbols": ["object"], "postprocess": id},
    {"name": "if", "symbols": [(lexer.has("_if") ? {type: "_if"} : _if), "_", {"literal":"("}, "_", "if_expr", "_", {"literal":")"}, "_", "statement"], "postprocess": 
        (data) => {
            return {
                type: "if",
                bexpr: data[4],
                body: data[8]
            }
        }
        },
    {"name": "else", "symbols": [(lexer.has("_else") ? {type: "_else"} : _else), "_", "statement"], "postprocess": 
        (data) => {
            return {
                type: "else",
                body: data[5]
            }
        }
        },
    {"name": "array$ebnf$1$subexpression$1", "symbols": ["arr_elems", "_"]},
    {"name": "array$ebnf$1", "symbols": ["array$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "array$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "array", "symbols": [(lexer.has("l_sqbr") ? {type: "l_sqbr"} : l_sqbr), "_", "array$ebnf$1", (lexer.has("r_sqbr") ? {type: "r_sqbr"} : r_sqbr)], "postprocess": 
        (data) => {
            return {
                type: "array",
                elems: data[2] ? data[2][0] : []
            }
        }
        },
    {"name": "get_arr_elem", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("l_sqbr") ? {type: "l_sqbr"} : l_sqbr), "_", "expr", "_", (lexer.has("r_sqbr") ? {type: "r_sqbr"} : r_sqbr)], "postprocess": 
        (data) => {
            return {
                type: "get_arr_elem",
                index: data[4],
                name: data[0]
            }
        }
        },
    {"name": "arr_elems", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
            },
    {"name": "arr_elems", "symbols": ["arr_elems", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
            },
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
    {"name": "operator", "symbols": [(lexer.has("greater") ? {type: "greater"} : greater)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("lesser") ? {type: "lesser"} : lesser)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("greater_equal") ? {type: "greater_equal"} : greater_equal)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("lesser_equal") ? {type: "lesser_equal"} : lesser_equal)], "postprocess": id},
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
