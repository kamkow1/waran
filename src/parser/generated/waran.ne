@preprocessor typescript

@{%
const lexer = require("../../lexer/lexer").lexer;
%}

@lexer lexer

statements
    -> statement
    {%
        (data) => {
            return [data[0]];
        }
    %}
    |  statements %NL statement
    {%
        (data) => {
            return [...data[0], data[2]];
        }
    %}

statement 
    -> var_assign {% id %}
    |  func_exec  {% id %}

statement -> var_assign %NL

var_assign
    -> %identifier _ "=" _ expr
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                }
            }
        %}

func_exec
    -> %identifier _ "(" _ args _ ")"
    {%
        (data) => {
            return {
                type: "func_exec",
                func_name: data[0],
                arguments: data[4]
            }
        }
    %}
    | %identifier _ "(" _ ")"
    {%
        (data) => {
            return {
                type: "func_exec",
                func_name: data[0],
                arguments: []
            }
        }
    %}
    

args
    -> expr 
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  args __ expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}

expr
    -> %string {% id %}
    |  %number {% id %}
    |  %identifier {% id %}

_ -> %NL:*

__ -> %NL:+