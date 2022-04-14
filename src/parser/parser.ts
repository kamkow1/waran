import { Parser, Grammar } from 'nearley'
import grammar from './generated/grammar'

const parser = new Parser(Grammar.fromCompiled(grammar));

export const runParse = (code: string) => {
    parser.feed(code);

    const ast = parser.results[0];
    console.log(typeof ast)
    return ast;
}