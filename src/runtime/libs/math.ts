function add(...args: number[]) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}

function mult(...args: number[]) {
    return args.reduce((prev, curr) => {
        return prev * curr;
    });
}

function div(...args: number[]) {
    return args.reduce((prev, curr) => {
        return prev / curr;
    });
}

function subtr(...args: number[]) {
    return args.reduce((prev, curr) => {
        return prev - curr;
    });
}

function pow(...args: number[]) {
    return args.reduce((prev, curr) => {
        return prev ** curr;
    });
}