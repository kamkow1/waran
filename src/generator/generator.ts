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
    if (node[0] && node[0].type === 'var_assign') {
        const name = node[0].var_name.value;
        const expr = node[0].value.value;
        const js =  `var ${name} = ${expr};`;
        return js;
    }

    if (node.type === 'func_exec') {
        console.log('func');
        const name = node.func_name.value;
        let argList = node.arguments.map((arg: any) => {
            return arg.value
        })
        .join(', ');

        console.log(argList)

        return `${name}(${argList})`;
    }

    if (node.type === 'number') return node.value;

    if (node.type === 'string') return node.value;
}