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
    -> %identifier _ "(" _ (args _) ")"
    {%
        (data) => {
            return {
                type: "func_exec",
                func_name: data[0],
                arguments: data[4][0]
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
    |  %func_exec {% id %}
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