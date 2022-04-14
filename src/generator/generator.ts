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
            return createStatement(arg);
        })
        .join(', ');

        let funcExecName = "";
        if (functions.filter(f => f.alias == name).length != 0) {
            funcExecName = functions.find(f => f.alias == name).exec;
        } else {
            funcExecName = name;
        }

        return `${funcExecName}(${argList})`;
    } else if (node.type == 'lambda') {
        const params = node.parameters;
        let paramNames = params.map((p: any) => {
            return createStatement(p);
        })
        .join(', ');

        let body = node.body.map((elem:any) => {
            return createStatement(elem);
        });

        const js = `(${paramNames}) => {\n ${body} \n}`;
        return js;
    } else if (node.type == 'identifier') {
        console.log(typeof node.value);
        return node.value;
    } else if (node.type == 'number') {
        return node.value;
    } else if (node.type == 'string') {
        return node.value;
    } else {
        console.log(JSON.stringify(node, null, 4));
        throw new Error('unhandled ast node');
    }
}