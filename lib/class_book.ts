import { books } from "../data/books";
import { Book } from "../data/books";
import { toLowerCase, addElement, countMatching, sort, } from "./utils";

export class book {
  // Khai báo đối tượng chỉ sử dụng trong lớp book
  private book: Book[];

  constructor() {
    this.book = books;
  }

  /**
   * Phương thức đếm số lượng sách thuộc nhà xuất bản
   * @param books Mảng các quyển sách
   * @param publisher Tên nhà xuất bản
   * @returns Số lượng quyển sách thuộc nhà xuất bản publisher
   */
  public countBooksOfPublisher(books: Book[], publisher: string = ""): number {
    if (publisher == "")
      return books.length;

    let soLuongSach: number = 0;
    const lowerCasePublisher = toLowerCase(publisher); // Chuyển đổi publisher sang chữ thường trước vòng lặp
    for (let i: number = 0; i < books.length; i++) {
      if (lowerCasePublisher === toLowerCase(books[i].provider)) { // So sánh chuỗi chữ thường
        soLuongSach += 1;
      }
    }
    return soLuongSach;
  }


  /**
   * Phương thức lấy các quyển sách có giá trong đoạn [min, max]
   * @param books Mảng các quyển sách
   * @param min Giá nhỏ nhất
   * @param max Giá lớn nhất
   * @returns Mảng các quyển sách có giá trong đoạn [min, max]
   */
  public filterByPrice(books: Book[], min: number, max: number): Book[] {
    let arr: Book[] = [];

    for (let i: number = 0; i < books.length; i++) {
      const price = books[i].price;
      if (price >= min && price <= max) {
        addElement<Book>(arr, books[i]);
      }
    }

    return arr;
  };


  /**
   * Phương thức trả về id của sách có giá bán cao nhất
   * @param books Mảng các quyển sách
   * @returns Tên quyển sách có giá cao nhất
   */
  public findMaxPrice(books: Book[]): number[] {
    // Nếu mảng sách rỗng thì không cần tìm và trả về mảng rỗng
    if (books.length == 0)
      return [];

    let ids: number[] = []; // Mảng lưu các id của các quyển sách có giá cao nhất
    let maxPrice = books[0].price; // Giá cao nhất hiện tại

    for (let i: number = 0; i < books.length; i++) {
      if (books[i].price > maxPrice) { // Có một quyển sách có giá lớn hơn maxPrice
        maxPrice = books[i].price; // Cập nhật maxPrice bằng giá mới nhất

        // Bỏ đi các kết quả đã có trước đó và khởi tạo lại mảng ids mới
        ids = [];
        addElement<number>(ids, i);
      }
      else if (books[i].price == maxPrice) { // Có một quyển sách có giá bằng với giá lớn nhất
        // Thêm quyển sách đó vào mảng ids
        addElement<number>(ids, i);
      }
    }
    return ids;
  };


  /**
   * Phương thức tính trung bình cộng giá của các quyển sách
   * @param books Mảng các quyển sách
   * @returns Giá trung bình
  */
  public getAveragePrice(books: Book[]): number {
    let sum: number = 0;
    const len: number = books.length; // Lưu trữ độ dài của mảng books để tránh tính toán lại trong vòng lặp

    // Tính tổng giá sách
    for (let i: number = 0; i < len; i++) {
      sum += books[i].price;
    }

    const average: number = Math.floor(sum / len); // Tính trung bình cộng price
    return average;
  }


  /**
   * Phương thức để lấy hàm kiểm tra mảng sách hợp lệ (tên sách khác rỗng, giá bán >=0)
   * @param books Mảng các quyển sách
   * @param dieuKien Điều kiện kiểm tra hợp lệ
   * @returns true nếu hợp lệ, ngược lại trả về false
   */
  public getIsValidFunction(books: Book[]): boolean {
    const condition = (book: Book) => book.price > 0 && book.name != "";

    // Khai báo hàm để kiểm tra mảng hợp lệ hay không
    const isValid = (): boolean => {
      for (let i: number = 0; i < books.length; i++) {
        if (!condition(books[i]))  // Nếu vi phạm điều kiện thì trả về false
          return false;
      }
      return true; // Nếu không có cuốn sách nào vi phạm điều kiện thì trả về true
    }

    let result = isValid();
    return result; // Trả về hàm
  }

  /**
   * Phương thức lấy ra quyển sách có tên giống 1 từ keyword cho trước
   * @param books Mảng các quyển sách
   * @param keyword Từ khóa dùng để tìm kiếm
   * @returns Mảng các quyển sách thỏa yêu cầu
  */
  public searchByName(books: Book[], keyword: string): Book[] {
    keyword = toLowerCase(keyword);
    const filteredBooks: Book[] = []; // Mảng kết quả
    const scores: number[] = []; // Mảng lưu điểm của từng quyển sách trong filteredBooks
    // Với mỗi quyển sách trong mảng sách
    for (let book of books) {
      const bookName = toLowerCase(book.name); // Chuyển thành ký tự thường để tìm kiếm tốt hơn
      const score = countMatching(keyword, bookName); // Điểm là số lần mà có một từ trong keyword khớp một từ trong bookName
      // Nếu keywrod gần giống với bookName thì thêm phần tử vào mảng
      if (score > 0) {
        addElement<number>(scores, score);
        addElement<Book>(filteredBooks, book);
      }
    }
    // Sắp xếp kết quả theo thứ tự điểm từ cao đến thấp
    sort<number, Book>(scores, filteredBooks, (x, y) => x < y);

    return filteredBooks;
  }
}

