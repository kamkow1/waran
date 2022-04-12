import { Parser, Grammar } from 'nearley'
import { grammar } from './generated/grammar'
import fs from 'fs'

const parser = new Parser(Grammar.fromCompiled(grammar));

export const runParse = (code: string, filename: string) => {
    const outputFile = filename.replace('.wr', '.ast');

    parser.feed(code);

    const ast = parser.results[0];
    fs.writeFileSync(outputFile, JSON.stringify(ast));

    console.log(parser.results);
}