/**
 * Hàm thêm một phần tử vào mảng cho trước
 * @param arr Mảng được thêm phần tử
 * @param element Phần tử dùng để thêm vào mảng
 */
export function addElement<Type>(arr: Type[], element: Type) {
    const len = arr.length;
    arr[len] = element;
}

/**
 * Chuyển các ký tự trong chuỗi thành chữ viết thường
 * @param str Chuỗi cần được chuyển thành chữ thường
 * @returns Chuỗi kết quả
 */
export function toLowerCase(str: string): string {
    let result = "";

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const charCode = char.charCodeAt(0); // Lấy mã ASCII

        // Nếu đây là ký tự hoa (theo ASCII)
        if (charCode >= 65 && charCode <= 90) {
            // Cộng thêm 32 để chuyển thành ký tự thường (theo ASCII)
            const lowercaseCharCode = charCode + 32;
            // Lấy ký tự tương ứng với mã ASCII và cộng vào kết quả
            result += String.fromCharCode(lowercaseCharCode);
        } else {
            // Nếu đây không phải là chữ viết hoa thì thêm vào kết quả
            result += char;
        }
    }

    return result;
}

/**
 * Hàm xóa đi khoảng trắng thừa phía trước, phía sau và ở giữa chuỗi
 * @param str Chuỗi cần xử lý
 * @returns Chuỗi kết quả
 */
function removeExtraSpace(str: string): string {
    const len = str.length;
    let res: string = ""; // Chuỗi kết quả

    let i = 0;
    let flag: boolean = false; // Cờ đánh dấu đã bỏ qua hết khoảng trắng ở đầu chuỗi

    // Vòng lặp dùng để duyệt từng ký tự
    while (i < len) {
        // Nếu gặp ký tự là khoảng trắng
        if (str[i] == " ") {
            // Lặp cho đến khi ký tự tiếp theo không phải khoảng trắng thì dừng
            while (str[i + 1] == " ") {
                i++;
            }
        }
        else { // Nếu ký tự không là khoảng trắng

            // Điều kiện để quyết định xem có nên thêm khoảng trắng không
            if (flag) // Nếu đã bỏ qua hết khoảng trắng ở đầu chuỗi thì cộng thêm khoảng trắng để ngăn cách các từ
                res += " ";
            else
                flag = true; // Đánh dấu lại là đã bỏ qua hết khoảng trắng đầu

            // Trong khi còn gặp ký tự không phải khoảng trắng thì thêm ký tự đó vào chuỗi kết quả
            while (str[i] != " " && i < len) {
                res += str[i];
                i++;
            }
        }
        i++; // Tăng biến chạy để lặp tiếp ký tự tiếp theo
    }
    return res;
}

/**
 * Hàm tách các một chuỗi ra thành một mảng các từ
 * @param str Chuỗi cần xử lý
 * @returns Mảng kết quả
 */
function split(str: string): string[] {
    str = removeExtraSpace(str); // Cắt bỏ khoảng trắng thừa
    const len = str.length;
    const arr: string[] = []; // Mảng kết quả

    let i = 0;
    while (i < len) {
        let aWord: string = ""; // Biến lưu lại một từ
        // Trong khi ký tự chưa phải là khoảng trắng thì thêm ký tự đó vào aWord
        while (i < len && str[i] != " ") {
            aWord += str[i];
            i++;
        }
        addElement<string>(arr, aWord); // Thêm từ đã tìm được vào mảng kết quả
        i++;
    }

    return arr;
}

/**
 * Hàm nối các phần tử trong mảng lại thành một chuỗi, ngăn cách nhau bằng khoảng trắng
 * @param arr Mảng cần xử lý
 * @returns Chuỗi kết quả
 */
function join(arr: string[]): string {
    const len = arr.length;
    if (len == 0)
        return "";

    // Xây dựng chuỗi kết quả
    let res = "";
    // Vòng lặp nối các từ lại với nhau, trừ từ cuối cùng
    for (let i = 0; i < len - 1; i++) {
        res += arr[i] + " ";
    }
    res += arr[len - 1]; // Nối thêm từ cuối cùng
    return res;
}

/**
 * Hàm đếm số lần mà một từ trong str1 khớp với một từ trong str2
 * @param str1 Chuỗi thứ nhất
 * @param str2 Chuỗi thứ hai
 * @returns Số lần các từ khớp với nhau
 */
export function countMatching(str1: string, str2: string): number {
    // Tách chuỗi thành mảng
    const a = split(str1);
    const b = split(str2);

    // Xử lý thuật toán trên mảng
    const lenA = a.length;
    const lenB = b.length;
    let count = 0;
    // Bắt cặp từ một phần tử ở mảng a với một phần tử ở mảng b
    for (let i = 0; i < lenA; i++) {
        for (let j = 0; j < lenB; j++) {
            if (a[i] == b[j]) // Nếu 2 phần tử giống nhau thì tăng đếm
                count++;
        }
    }
    return count;
}

/**
 * Hàm hoán vị 2 phần tử trong mảng
 * @param arr Mảng cần được hoán vị phần tử
 * @param index1 Chỉ số của phần tử thứ nhất
 * @param index2 Chỉ số của phần tử thứ hai
 */
function swap<Type>(arr: Type[], index1: number, index2: number): void {
    const len = arr.length;
    if (index1 >= 0 && index1 < len && index2 >= 0 && index2 < len) {
        const tmp: Type = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = tmp;
    }
}

/**
 * Hàm sắp xếp mảng arr1 và sắp xếp mảng arr2 theo mảng arr1
 * @param arr1 Mảng sắp xếp chính
 * @param arr2 Mảng sắp xếp theo arr1
 * @param condition Điều kiện để hoán vị 2 phần tử trong mảng chính (điều kiện nghịch thế)
 */
export function sort<Type1, Type2>(arr1: Type1[], arr2: Type2[], condition: (value1: Type1, value2: Type1) => boolean): void {
    const len = arr1.length;
    // Thuật toán Interchange sort
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            // Nếu có nghịch thế thì hoán vị 2 phần tử thứ i và j cho nhau trên cả 2 mảng
            if (condition(arr1[i], arr1[j])) {
                swap<Type1>(arr1, i, j);
                swap<Type2>(arr2, i, j);
            }
        }
    }
}