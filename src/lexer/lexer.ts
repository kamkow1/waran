import moo from 'moo'
import { config } from './config';

const lexer = moo.compile(config);

export const runLex = (code: string) => {
    lexer.reset(code);

    while(true) {
        const token = lexer.next();
    
        if (!token) {
            break;
        }
    
        console.log(token);
    }
}