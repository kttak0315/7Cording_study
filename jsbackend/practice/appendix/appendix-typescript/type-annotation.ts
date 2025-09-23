let username: string = "seungkyoo";
let height: number = 179;
let isConditionGood: boolean = true;
let myInfoWithGender: {
    name: string;
    height: number;
    isContionGood: boolean;
    gender?: string;
} = {
    name: "seungkyoo",
    height: 179,
    isConditionGood: true,
};

function printMessageWithAlert(message: string, isCritical?: boolean): void {
    console.log(message);

    if (isCritical) {
        alert(message);
    }
}