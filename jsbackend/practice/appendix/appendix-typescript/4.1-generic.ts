function echo(message: any) : any {
    console.log("in echo : ", message);
    return message;
}

type phone = {
    name: string,
    price: number,
    brand: string,
}

const myPhone = {name: "iPhone", price: 1000, brand: "Apple"}
echo(1)
echo("안녕")
echo(myPhone);