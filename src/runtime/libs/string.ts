const nl = '\n'

function concat(...args: string[]) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    });
}

function replace(text: string, target: string, newText: string) {
    return text.replace(target, newText);
}

function substr(text: string, start: number, end: number) {
    return text.substring(start, end);
}

function reverse(text: string){
    return text.split('').reverse().join('');
}