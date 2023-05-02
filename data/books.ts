// Tạo kiểu dữ liệu Book và đối tượng books
type Book = {
    id: number,
    name: string,
    price: number,
    provider: string,
};

const books: Book[] = [
    {
      id: 1,
      name: "Luat tam thuc",
      price: 220000,
      provider: "Fahasha",
    },
    {
      id: 2,
      name: "Chien binh cau vong",
      price: 140000,
      provider: "Fahasha",
    },
    {
      id: 3,
      name: "Luat hinh su trong luat Viet Nam",
      price: 90000,
      provider: "Tuoi tre",
    },
    {
      id: 4,
      name: "Bye Beo",
      price: 305000,
      provider: "Kmin Book",
    },
    {
      id: 5,
      name: "Tam ly hoc toi pham",
      price: 400000,
      provider: "Kmin Book",
    },
    {
      id: 6,
      name: "Tren duong bang",
      price: 200000,
      provider: "BBBBB",
    },
    {
      id: 6,
      name: "Tren duong bang 123",
      price: 200000,
      provider: "AAAA",
    },
];

export {books, Book};

