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
        
        return `var ${name} = ${expr};\n`;
    } else if (node.type == 'func_exec') {
        const name = node.func_name.value;
        const arr = node.arguments.map((arg: any) => createStatement(arg));

        const argList = arr.join(',');

        return `${name}(${argList})\n`;
    } else if (node.type == 'lambda') {
        const params = node.parameters;
        const arr  = params.map((param: any) => createStatement(param));

        const paramNames = arr.join(', ');
        
        const body = node.body.map((elem: any) => createStatement(elem));

        return `(${paramNames}) => {\n ${body.join('')} \n}`;
    } else if (node.type == 'use_mod') {
        const name = node.mod_name;

        console.log(path.resolve(`./.waran//runtime/libs/${name}.js`));
        const module = fs.readFileSync(path.resolve(`./.waran//runtime/libs/${name}.js`)).toString();
        return module;
    } else if (node.type == 'identifier') {
        return node.value;
    } else if (node.type == 'number') {
        return node.value;
    } else if (node.type == 'string') {
        return node.value;
    } else if (node.type == 'comment') {
        return '';
    } else if (node.type == 'ml_comment') {
        return '';
    } else {
        console.log(clc.redBright('unhandled ast node'));
        process.exit(0);
    }
}