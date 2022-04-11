import { Parser, Grammar } from 'nearley'
import { grammar } from './generated/grammar'

const parser = new Parser(Grammar.fromCompiled(grammar));

export const runParse = (code: string) => {
    parser.feed(code);

    console.log(parser.results);
}