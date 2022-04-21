import clc from 'cli-color';
import fs from 'fs'
import * as path from 'path'

export const generate = (ast: any) => createJS(ast);

const createJS = (ast: any) => {
    const lines = [];
    for (const statement of ast) {
        const line = createStatement(statement);
        lines.push(line);
    }

    return lines.join('\n');
}

const createStatement = (node: any) => {
    if (node.type == 'var_assign') {
        const name = node.var_name.value;
        const expr: any = createStatement(node.value);
        
        return `var ${name} = ${expr};`;
    } else if (node.type == 'func_exec') {
        const name = node.func_name.value;
        const arr = node.arguments.map((arg: any) => createStatement(arg));

        const argList = arr.join(',');
        const awaitWord = node.hasAwait? "await " : "";

        return `${awaitWord}${name}(${argList})\n`;
    } else if (node.type == 'lambda') {
        const params = node.parameters;
        const arr  = params.map((param: any) => createStatement(param));

        const paramNames = arr.join(', ');
        
        const body = node.body.map((elem: any) => createStatement(elem));

        //onst asyncWord = node.isAsync? "async " : ""

        return `(${paramNames}) => {\n ${body.join('')} \n}`;
    } else if (node.type == 'use_mod') {
        const name = node.mod_name;

        const module = fs.readFileSync(path.resolve(`./.waran//runtime/libs/${name}.js`)).toString();
        return module;
    } else if (node.type == 'if') {
        const expr = createStatement(node.bexpr);
        const body = createStatement(node.body);

        return `if ${expr}${body}`;
    } else if (node.type == 'if_expr') {
        const left = createStatement(node.left);
        const right = createStatement(node.right);
        const op = node.op.value;

        return `(${left} ${op} ${right})`;
    } else if (node.type == 'else') {
        const body = createStatement(node.body);

        return `else ${body}`;
    } else if (node.type == 'array') {
        const elems = node.elems? node.elems.map((elem: any) => createStatement(elem)).join(',') : '';

        return `[${elems}]`;
    } else if (node.type == 'get_arr_elem') {
        const index = createStatement(node.index);
        const name = createStatement(node.name);

        return `${name}[${index}]`;
    } else if (node.type == 'increment_decrement') {
        const name = node.name;
        const op = node.op;

        return `${name}${op}`;
    } else if (node.type == 'while_loop') {
        const body = createStatement(node.body);
        const condition = createStatement(node.condition);

        return `while(${condition})${body}`;
    } else if (node.type == 'for_loop') {
        const assignment = createStatement(node.assignment);
        const condition = createStatement(node.loop_condition);
        const varName = createStatement(node.var_name);
        const operator = node.op.value;
        const body = createStatement(node.body);

       return `for(${assignment} ${condition}; ${varName}${operator})${body}`;
    } else if (node.type == '_break') {
        return node.value;
    } else if (node.type == '_continue') {
        return node.value;
    } else if (node.type == 'code_block') {
        const code = node.body? node.body.map((elem: any) => createStatement(elem)).join('') : '';

        return `{\n${code}\n}\n`;
    } else if (node.type == 'condition') {
        const sign = node.sign
        const expr1 = createStatement(node.expr1);
        const expr2 = createStatement(node.expr2);

        return `${expr1} ${sign} ${expr2}`;
    } else if (node.type == 'return_statement') {
        const val = node.returned_val;
        return `return ${val}`;
    } else if (node.type == 'object') {
        const props = node.props? node.props.map((elem: any) => createStatement(elem)).join(',\n') : '';
        return `{${props}}`;
    } else if (node.type == 'obj_prop') {
        const name = createStatement(node.name);
        const value = createStatement(node.val);
        return `${name}: ${value}`;
    } else if (node.type == 'method_call') {
        const name = createStatement(node.obj_name);
        const method = createStatement(node.method);

        return `${name}.${method};`;
    } else if (node.type == 'identifier') {
        return node.value;
    } else if (node.type == 'number') {
        return node.value;
    } else if (node.type == '_bool') {
        return node.value;
    } else if (node.type == 'string') {
        return node.value;
    } else if (node.type == 'comment') {
        return '';
    } else if (node.type == 'ml_comment') {
        return '';
    } else if (node.type == 'is') {
        return node.value;
    } else if (node.type == 'and') {
        return node.value;
    } else if (node.type == 'not') {
        return node.value;
    } else if (node.type == 'or') {
        return node.value;
    }   else {
        console.log(JSON.stringify(node, null, 4))
        console.log(clc.redBright('unhandled ast node'));
        process.exit(0);
    }
}