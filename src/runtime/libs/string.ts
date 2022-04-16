function concat(...args: string[]) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}

function replace(text: string, target: string, newText: string) {
    return text.replace(target, newText);
}