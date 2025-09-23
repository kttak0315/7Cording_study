function Timer() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.time(`Elapsed time`);
            const result = originalMethod.apply(this, args);
            console.timeEnd(`Elapsed time`);
            return result;
        };
    }
}

class ElapsedTime {
    @Timer()
    hello() {
        console.log()`Hello`);
    }
}