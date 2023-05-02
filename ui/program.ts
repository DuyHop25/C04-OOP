import { question } from "readline-sync";
import { book } from "../lib/class_book";// Lớp đối tượng book
import chalk from "chalk";               // Thư viện để làm màu cho terminal
import { books } from "../data/books";   // Dữ liệu mảng các quyển sách


class Program {
  // Mảng sách thử nghiệm
  private Book: book;

  // Lấy các hàm trong thư viện chalk để dùng
  private info = chalk.blueBright.bold;
  private danger = chalk.redBright.italic.bold;
  private success = chalk.greenBright.bold;

  /**
   * Phương thức nhập dữ liệu từ bản phím
   * @param text Chuỗi in ra để yêu cầu người dùng nhập
   * @param condition Điều kiện kiểm tra dữ liệu hợp lệ
   * @returns Dữ liệu hợp lệ được nhập từ bàn phím
   */
  input<Type extends number | string>(text: string, condition: (data: Type) => boolean): Type {
    let data: Type;
    let isValid: boolean = true;
    do {
      const str = question(this.info(text));
      data = str as Type;
      isValid = condition(data);
      if (!isValid)
        console.log(this.danger("Vui long nhap du lieu hop le!"));
    } while (!isValid);
    return data;
  };


  constructor() {
    this.Book = new book();
  };

  /**
   * Phương thức in ra menu của chương trình
   */
  private menu() {
    console.log(this.info("============= MinShop ============="));
    console.log("1. So luong sach cua NXB.");
    console.log("2. Gia trung binh cua cac quyen sach.");
    console.log("3. ID sach co gia cao nhat.");
    console.log("4. Kiem tra thong tin sach hop le.");
    console.log("5. Loc theo gia.");
    console.log("6. Tim kiem sach.");
    console.log(this.info("============= Menu ==============="));
  }

  /**
   * Phương thức chạy chương trình chính
   */
  public run() {
    let choice: number = 0;

    do {
      this.menu();
      choice = Number(question(this.info('Chon chuc nang (Nhap so 0 de dung): ')));
      console.clear();
      switch (choice) {
        case 1:
          const publisher: string = this.input<string>(this.info("Nhap ten NXB: "), (data) => data != '');
          const numBooks = this.Book.countBooksOfPublisher(books, publisher);
          console.log(this.success(`So luong sach cua nxb "${publisher.toUpperCase()}" la: ${numBooks}`));
          break;
        case 2:
          const averagePrice = this.Book.getAveragePrice(books);
          console.log(this.success(`Gia trung binh cong: ${averagePrice}`));
          break;
        case 3:
          const ids = this.Book.findMaxPrice(books);
          console.log(this.success(`id sach co gia ban cao nhat la: ${ids}`));
          break;
        case 4:
          const isValid = this.Book.getIsValidFunction(books);
          if (isValid)
            console.log(this.success("Hop le."))
          else
            console.log(this.success("Khong hop le."))
          break;
        case 5:
          const minPrice: number = this.input<number>("Nhap gia nho nhat: ", (data) => data > 0);
          const maxPrice: number = this.input<number>("Nhap gia lon nhat: ", (data) => data > 0);
          const filteredBooks1 = this.Book.filterByPrice(books, minPrice, maxPrice);
          console.log(this.success(`Sach co gia trong doan [${minPrice}, ${maxPrice}] la: `));
          console.log(filteredBooks1);
          break;
        case 6:
          const keyword: string = this.input<string>("Nhap tu khoa tim kiem: ", (data) => data != "");
          const filteredBooks2 = this.Book.searchByName(books, keyword);
          console.log(this.success(`Sach co ten trung voi keyword la:`));
          console.log(filteredBooks2);
          break;
      }
    } while (choice !== 0);
    console.log(this.info("Cam on ban da su dung ung dung. Tam biet!"));
  }
}

export { Program };