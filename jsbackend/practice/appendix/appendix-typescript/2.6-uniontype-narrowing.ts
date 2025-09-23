let anyValue: number | string | boolean = 10;
printAny(anyValue);
anyValue = "Hello";
printAny(anyValue);
anyValue = true;
printAny(anyValue);

function printAny(value: number | string | boolean): void {
    if (typeof value === "number") {
        console.log(value);
    } else if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else if (typeof value === "boolean") {
        console.log(value ? "참" : "거짓");
    }
}