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
    if (node.type === 'var_assign') {
        const name = node.var_name.value;
        const expr = node.value.value
        const js =  `var ${name} = ${expr};`;
        return js;
    }
}