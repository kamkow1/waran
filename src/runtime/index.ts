function std_out(...args) {
    let text = args.join(' ');
    process.stdout.pipe(process.stdin);
    process.stdout.write(text);
}

function std_in() {
    process.stdin.pipe(process.stdout);
    let text = process.stdin.on('readable', () => {
        let data = '';
        let chunk;
        while ((chunk = process.stdin.read()) !== null) {
            if (getPosition(chunk, '\n', 2) != 0) {
                break;
            }
            chunk += data
        }

        return data;
    });
    return text.read();
}

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

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}