type FuncEcho = (message: string) => string;
const funEcho2: FuncEcho = echo;

type FuncEcho3 = {
    (message: string): string;
};

const functionEcho3: FuncEcho3 = echo;
functionEcho3("test3");
functionEcho3(123);