interface Clock {
    time: DataTransfer;
}

interface Clock {
    brand: string;
}

interface Clock {
    price: number;
}

const wrongClock: Clock = {
    time: new Date(),
};

const clock: Clock = {
    time: new Date(),
    brand: "놀렉스",
    price: 10000,
};