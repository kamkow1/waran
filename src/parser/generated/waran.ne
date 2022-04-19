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

code_block -> "{" _ %NL statements %NL _  "}"
{%
    (data) => {
        return {
            type: "code_block",
            body: data[3]
        }
    }
%}

statement 
    -> var_assign {% id %}
    |  func_exec  {% id %}
    |  %comment   {% id %}
    |  %ml_comment {% id %}
    |  use_mod {% id %}
    |  if {% id %}
    |  else {% id %}
    |  for_loop {% id %}
    |  code_block {% id %}

condition -> expr _ %luse _ expr
{%
    (data) => {
        return {
            type: "condition",
            expr1: data[0],
            expr2: data[4],
            sign: data[2]
        }
    }
%}
|   expr _ %ruse _ expr
{%
    (data) => {
        return {
            type: "condition",
            expr1: data[0],
            expr2: data[4],
            sign: data[2]
        }
    }
%}

for_loop -> %_for _ "(" _ var_assign _ "|" _ expr _ "|" _ %identifier %increment _ ")" _ statement
{%
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
%}
|    %_for _ "(" _ var_assign _ "|" _ expr _ "|" _ %identifier %decrement _ ")" _ statement
{%
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
%}

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
    -> %identifier _ %assign _ expr
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                }
            }
        %}
    |   %identifier _ %assign _ if_expr
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
    | ("await"):? %identifier _ "(" _ ")"
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
    |  %_bool {% id %}
    |  %if_expr {% id %}
    |  array {% id %}
    |  get_arr_elem {% id %}
    |  %identifier {% id %}
    |  statement {% id %}
    |  lambda {% id %}
    |  condition {% id %}

array -> %l_sqbr _ (arr_elems _):?  %r_sqbr
{%
    (data) => {
        return {
            type: "array",
            elems: data[2] ? data[2][0] : []
        }
    }
%}

get_arr_elem -> %identifier _ %l_sqbr _ expr _ %r_sqbr
{%
    (data) => {
        return {
            type: "get_arr_elem",
            index: data[4],
            name: data[0]
        }
    }
%}

arr_elems 
    -> expr
    {%
        (data) => {
            return [data[0]];
        }
    %}
    | arr_elems __ expr
    {%
        (data) => {
            return [...data[0], data[2]];
        }
    %}

lambda -> %func _ "(" _ (params _):? ")" _ "->" _ lambda_body
{%
    (data) => {
        return {
            type: "lambda",
            parameters: data[4] ? data[4][0] : [],
            body: data[9]
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

operator 
    -> %and {% id %}
    | %or {% id %}
    | %not {% id %}
    | %is {% id %}
    | %not_is {% id %}

if 
    -> "if" _ "(" _ if_expr _ ")" _ statement _ (else):?
{%
    (data) => {
        return {
            type: "if",
            bexpr: data[4],
            body: data[8]
        }
    }
%}

else 
    -> %_else _ "{" %NL _ statement
{%
    (data) => {
        return {
            type: "else",
            body: data[5]
        }
    }
%}

if_expr -> expr _ operator _ expr
{%
    (data) => {
        return {
            type: "if_expr",
            left: data[0],
            op: data[2],
            right: data[4]
        }
    }
%}

NL -> %NL:+

_ -> %WS:*

__ -> %WS:+