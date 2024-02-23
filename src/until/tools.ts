/**
 * 随机生成uuid函数
 * @returns 
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = Math.random() * 16 | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * 随机生成整数 
 * @param max number 最大数字
 * @returns number  生成的数小于max
 */
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}