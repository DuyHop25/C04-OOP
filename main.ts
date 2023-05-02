import {Program} from './ui/program'

/**
 * Hàm chạy chương trình chính.
 * Kỹ thuật: IIFE
 */
(function main(): void {
    const result = new Program();
    console.log(result.run());
})();
