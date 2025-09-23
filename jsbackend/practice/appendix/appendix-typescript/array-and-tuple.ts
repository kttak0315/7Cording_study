const numbers: number[] = [1, 2, 3, 4, 5];
const stringArray: Array<string> = ["a", "b", "c", "d", "e"];
const numbers2: number[] = [6, 7, 8, 9, 10];

const oneToTen = [...numbers, ...numbers2];
console.log(...oneToTen);

const idols: { name: string; birth: number }[] = [
    { name: "minji", birth: 2004 },
    { name: "hani", birth: 2004 },
    { name: "danielle", birth: 2006 },
    { name: "hyein", birth: 2008 },
];

const gameConsoleArray: Array<{ name: string; launch: number }> = [
    { name: "플레이스테이션5", launch: 2020 },
    { name: "엑스박스 시리지 X/S", launch: 2020 },
    { name: "닌텐도 스위치", launch: 2017 },
    { name: "스팀덱", launch: 2021 },
];

const myTuple: [string, number] = ["seungkyoo", 179];

function printMyInfo(label: string, info: [string, number]): void {
    console.log(`[${label}]`, ...info);
}

printMyInfo("튜플 테스트", myTuple);

function fetchUser(): [string, number] {
    return ["seungkyoo", 179];
}

const [ name24, height24] = fetchUser();
console.log(name24, height24);