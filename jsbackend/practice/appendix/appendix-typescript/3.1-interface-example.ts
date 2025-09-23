type BookType = {
    title: string;
    price: number;
    author: string;
};

interface Book {
    title: string;
    price: number;
    author: string;
}

let bookType: BookType = {
    title: "백엔드 개발자 되기",
    price: 10000,
    author: "백승규",
};

let book: Book = {
    title: "백엔드 개발자 되기",
    price: 10000,
    author: "백승규",
};