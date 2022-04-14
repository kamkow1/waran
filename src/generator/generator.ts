import clc from 'cli-color';
import functions from '../functions';

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

        const argList = arr.join(', ');

        let funcExecName = name;
        if (functions.filter(f => f.alias == name).length != 0) {
            funcExecName = functions.find(f => f.alias == name).exec;
        }

        return `${funcExecName}(${argList});`;
    } else if (node.type == 'lambda') {
        const params = node.parameters;
        const arr  = params.map((param: any) => createStatement(param));

        const paramNames = arr.join(', ');
        
        const body = node.body.map((elem: any) => createStatement(elem));

        return `(${paramNames}) => {\n ${body.join('')} \n}`;
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