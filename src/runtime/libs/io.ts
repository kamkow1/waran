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

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}