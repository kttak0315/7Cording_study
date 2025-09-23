interface Car {
    name: string;
    price: number:
    brand: string;
    options?: string[];
}

let avante: Car = {
    name: "아반떼",
    price: 1500,
    brand: "현대",
    options:["에어컨", "내비게이션"],
};

let morning: Car = {
    name: "모닝",
    price: 650,
    brand: "기아",
};

interface Citizen {
    id: string;
    name: string;
    region: string;
    readonly age: number;
}

let seunkyoo: Citizen = {
    id: "123456",
    name: "백승규",
    region: "경기",
    age: 40,
};

seunkyoo.age = 39;

