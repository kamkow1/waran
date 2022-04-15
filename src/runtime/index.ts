function std_out(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}

export const runtimeString = `

function std_out(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}

`;