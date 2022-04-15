function std_out(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}