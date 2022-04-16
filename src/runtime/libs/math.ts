function add(...args) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}

function mult(...args) {
    return args.reduce((prev, curr) => {
        return prev * curr;
    });
}

function div(...args) {
    return args.reduce((prev, curr) => {
        return prev / curr;
    });
}

function subtr(...args) {
    return args.reduce((prev, curr) => {
        return prev - curr;
    });
}

function pow(...args) {
    return args.reduce((prev, curr) => {
        return prev ** curr;
    });
}