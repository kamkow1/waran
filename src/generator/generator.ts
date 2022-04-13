import { functions } from '../functions/functions';

export const generate = (ast: any) => {
    const jsCode = createJS(ast);
    return jsCode;
}

const createJS = (ast: any) => {
    const lines = [];
    for (let statement of ast) {
        const line = createStatement(statement);
        lines.push(line);
    }

    return lines.join('\n');
}

const createStatement = (node: any) => {
    if (node.type == 'var_assign') {
        const name = node.var_name.value;
        const expr: any = createStatement(node.value);
        const js =  `var ${name} = ${expr};`;
        return js;
    } else if (node.type == 'func_exec') {
        const name = node.func_name.value;
        let argList = node.arguments.map((arg: any) => {
            console.log(arg)
            return createStatement(arg);
        })
        .join(', ');

        let funcExecName = "";
        for(let func of functions) {
            if (name === func.alias) {
                funcExecName = func.exec;
            } 
        }

        return `${funcExecName}(${argList})`;
    } else if (node.type == 'identifier') {
        return node.value;
    } else if (node.type == 'number') {
        return node.value;
    } else if (node.type == 'string') {
        return node.value;
    } else {
        throw new Error('unhandled ast node');
    }
}