statement
    -> var_assign

var_assign
    -> %identifier _ "=" _ expr

expr
    -> %string
    |  %number

_ -> %WS:*
_ -> %WS:+