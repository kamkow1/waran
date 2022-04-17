const PI = Math.PI;
const E = Math.E;
const PHI = parseFloat(`1.
618033988749894848
204586834365638117
720309179805762862
135448622705260462
818902449707207204
189391137484754088
075386891752126633
862223536931793180
060766726354433389
086595939582905638
322661319928290267
880675208766892501
711696207032221043
216269548626296313
614438149758701220
340805887954454749
246185695364864449
241044320771344947
049565846788509874
339442212544877066
478091588460749988
712400765217057517
978834166256249407
589069704000281210
427621771117778053
1531714101170466659
91466979873`);

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

function mod(...args: number[]) {
    return args.reduce((prev, curr) => {
        return prev % curr;
    });
}