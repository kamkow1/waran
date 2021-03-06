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

getter -> %_get _ %identifier _ lambda
{%
    (data) => {
        return {
            type: "getter",
            prop_name: data[2],
            func: data[4]
        }
    }
%}

setter -> %_set _ %identifier _ lambda
{%
    (data) => {
        return {
            type: "setter",
            prop_name: data[2],
            func: data[4]
        }
    }
%}

new_object -> %_new _ %identifier _ "(" _ (args _):? ")"
{%
    (data) => {
        return {
            type: "new_object",
            class_name: data[2],
            params: data[6] ? data[6][0] : []
        }
    }
%}

method -> %method _ (%_private _):? (%_static _):? _ %identifier _ "(" _ (params _):? ")" _ code_block
{%
    (data) => {
        return {
            type: "method",
            private: data[2] ? true : false,
            static: data[3] ? true : false,
            name: data[5],
            params: data[9] ? data[9][0] : [],
            body: data[12]
        }
    }
%}

class_field -> %field _ (%_private _):? (%terminal _):? (%_static _):? _ %identifier _ (%assign _ expr _):? ("#" %_get):? _ ("#" %_set):?
{%
    (data) => {
        return {
            type: "field",
            terminal: data[3] ? true : false,
            private: data[2] ? true : false,
            static: data[4] ? true : false,
            get: data[9] !== null && data[9][0] ? true : false,
            set: data[11] !== null && data[11][0] ? true : false,
            name: data[6],
            value: data[8] ? data[8][2] : []
        }
    }
%}

class_def -> %_class _ %identifier _ (%_from _ %identifier _):? code_block
{%
    (data) => {
        return {
            type: "class",
            name: data[2],
            base_class: data[4] ? data[4][2] : [],
            body: data[5]
        }
    }
%}

obj_prop_ref -> %identifier %dot %identifier _ (%assign _ expr _):?
{%
    (data) => {
        return {
            type: "prop_ref",
            obj_name: data[0],
            prop: data[2],
            val: data[4] ? data[4][2] : []
        }
    }
%}

obj_method_ref -> %identifier %dot func_exec
{%
    (data) => {
        return {
            type: "method_call",
            obj_name: data[0],
            method: data[2]
        }
    }
%}

object -> %prc "{" _ (%NL):? (_ properties _):? (%NL):? _ "}" _
{%
    (data) => {
        return {
            type: "object",
            props: data[4] ? data[4][1] : []
        }
    }
%}

property -> %identifier _ ":" _ expr
{%
    (data) => {
        return {
            type: "obj_prop",
            name: data[0],
            val: data[4]
        }
    }
%}

properties -> property
{%
    (data) => {
        return [data[0]];
    }
%}
|   properties "," %NL _ property
{%
    (data) => {
        return [...data[0], data[4]];
    }
%}

code_block -> "{" _ %NL (statements %NL _):?  "}" _
{%
    (data) => {
        return {
            type: "code_block",
            body: data[3] ? data[3][0] : []
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
    |  while_loop {% id %}
    |  increment_decrement {% id %}
    |  %_break {% id %}
    |  %_continue {% id %}
    |  return_statement {% id %}
    |  property {% id %}
    |  obj_method_ref {% id %}
    |  obj_prop_ref {% id %}
    |  class_def {% id %}
    |  class_field {% id %}
    |  method {% id %}
    |  %_get {% id %}
    |  %_set {% id %}

return_statement -> %_return _ expr
{%
    (data) => {
        return {
            type: "return_statement",
            returned_val: data[2]
        }
    }
%}

increment_decrement -> %identifier %inc_dec
{%
    (data) => {
        return {
            type: "increment_decrement",
            name: data[0],
            op: data[1]
        }
    }
%}

condition -> expr _ operator _ expr
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

while_loop -> %_while _ "(" _ expr _ ")" _ statement
{%
    (data) => {
        return {
            type: "while_loop",
            condition: data[4],
            body: data[8]
        }
    }
%}

for_loop -> %_for _ "(" _ var_assign _ "|" _ expr _ "|" _ %identifier %inc_dec _ ")" _ statement
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
    -> %use _ %at %identifier
{%
    (data) => {
        return {
            type: "use_mod",
            mod_name: data[3]
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
    |  object {% id %}
    |  new_object {% id %}

if -> %_if _ "(" _ if_expr _ ")" _ statement
{%
    (data) => {
        return {
            type: "if",
            bexpr: data[4],
            body: data[8]
        }
    }
%}

else -> %_else _ statement
{%
    (data) => {
        return {
            type: "else",
            body: data[5]
        }
    }
%}

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
    | %greater {% id %}
    | %lesser {% id %}
    | %greater_equal {% id %}
    | %lesser_equal {% id %}

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