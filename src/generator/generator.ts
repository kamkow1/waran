export const generate = (ast: any) => {
    const jsCode = createJS(ast);
    return jsCode;
}

const createJS = (ast: any) => {
    const lines = [];
    for (let statement of ast[0]) {
        const line = createStatement(statement);
        lines.push(line);
    }

    return lines.join('\n');
}

const createStatement = (node: any) => {
    if (node.type === 'var_assign') {
        const name = node.var_name.value;
        const expr = node.value.value;
        const js =  `var ${name} = ${expr};`;
        return js;
    }

    if (node.type === 'func_exec') {
        const name = node.func_name.value;
        let argList = node.arguments.map((arg: any) => {
            return createStatement(arg);
        })
        .join(', ');

        return `${name}(${argList})`;
    }

    if (node.type === 'number') return node.value;

    if (node.type === 'string') return node.value;
}