type cup = {
    size: string;
};

type brand = {
    brandName: string;
};

type brandedCup = cup & brand;

let starbucksGrandeSizeCup: brandCup = {
    brandName: "스타벅스",
    size: "grande",
};