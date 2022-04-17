@preprocessor typescript

@{%
const lexer = require("../../lexer/lexer").lexer;
%}

@lexer lexer

statements
    -> _ statement _
    {%
        (data) => {
            return [data[1]];
        }
    %}
    |  statements %NL _ statement _
    {%
        (data) => {
            return [...data[0], data[3]];
        }
    %}

statement 
    -> var_assign {% id %}
    |  func_exec  {% id %}
    |  %comment   {% id %}
    |  %ml_comment {% id %}
    |  use_mod {% id %}

use_mod
    -> %use _ %luse _ %identifier _ %ruse
{%
    (data) => {
        return {
            type: "use_mod",
            mod_name: data[4]
        }
    }
%}

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
    -> ("await"):? _ %identifier _ "(" _ (args _):? ")"
    {%
        (data) => {
            return {
                type: "func_exec",
                hasAwait: data[0] ? true : false,
                func_name: data[2],
                arguments: data[6] ? data[6][0] : []
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
    |  statement {% id %}
    |  lambda {% id %}

lambda -> "(" _ (params _):? ")" _ "->" _ lambda_body
{%
    (data) => {
        return {
            type: "lambda",
            parameters: data[2] ? data[2][0] : [],
            body: data[7]
        }
    }
%}

params
    -> %identifier
    {%
        (data) => {
            return [data[0]];
        }
    %}
    | params __ %identifier
    {%
        (data) => {
            return [...data[0], data[2]];
        }
    %}
    

lambda_body 
    -> expr 
    {% 
        (data) => {
            return [data[0]];
        }

     %}
    |  "{" _ %NL statements %NL _ "}"
    {%
        (data) => {
            return data[3];
        }
    %}

NL -> %NL:+

_ -> %WS:*

__ -> %WS:+