function std_out(...args) {
    let text = args.join(' ');
    /*process.stdout.pipe(process.stdin);
    process.stdout.write(text);*/
    console.log(text);
}

function std_in() {
    const stdin = process.openStdin();

    let input = '';
    stdin.addListener('data', function(d: string) {
        if (/\r|\n/.test(d)) {
            stdin.removeAllListeners();
        }
        input += d;
    });

    return input;
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

