import moo from 'moo'
import { config } from './config';

export const lexer = moo.compile(config);

lexer.reset('abc = 6');

while(true) {
    const token = lexer.next();

    if (!token) {
        break;
    }

    console.log(token);
}