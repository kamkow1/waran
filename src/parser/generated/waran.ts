import { config } from "src/lexer/config";

// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x: any) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "statement", "symbols": ["var_assign"]},
    {"name": "var_assign", "symbols": [config.identifier, "_", {"literal":"="}, "_", "expr"]},
    {"name": "expr", "symbols": [config.string]},
    {"name": "expr", "symbols": [config.number]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", config.WS], "postprocess": function arrpush(d: any) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "_$ebnf$2", "symbols": [config.WS]},
    {"name": "_$ebnf$2", "symbols": ["_$ebnf$2", config.WS], "postprocess": function arrpush(d: any) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$2"]}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
}
})();
