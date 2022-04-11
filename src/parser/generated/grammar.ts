import { config } from "src/lexer/config";

// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x: any) { return x[0]; }

    const runLex = require("../../lexer/lexer");
export const grammar = {
    Lexer: runLex,
    ParserRules: [
    {"name": "statement", "symbols": ["var_assign"]},
    {"name": "var_assign", "symbols": [(runLex.has("identifier") ? {type: "identifier"} : config.identifier), "_", {"literal":"="}, "_", "expr"]},
    {"name": "expr", "symbols": [(runLex.has("string") ? {type: "string"} : config.string)]},
    {"name": "expr", "symbols": [(runLex.has("number") ? {type: "number"} : config.number)]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (runLex.has("WS") ? {type: "WS"} : config.WS)], "postprocess": function arrpush(d: any) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "_$ebnf$2", "symbols": [(runLex.has("WS") ? {type: "WS"} : config.WS)]},
    {"name": "_$ebnf$2", "symbols": ["_$ebnf$2", (runLex.has("WS") ? {type: "WS"} : config.WS)], "postprocess": function arrpush(d: any) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$2"]}
]
  , ParserStart: "statement"
}
