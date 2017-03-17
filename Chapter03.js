/**
 * Created by isp_pia on 03.02.2017.
 */
console.log("Hello");
console.log();
console.log("Test My functiont MIN:");
function minMy(a, b) {
    return (a <= b) ? a : b;
}
console.log(minMy(0, 10));
console.log(minMy(0, -10));
console.log();
console.log("Test Recursion:");
function isEven(number) {
    let numberAbs = Math.abs(number);
    let result = false;
    function find(n) {
        if (n === 0) {
            result = true;
        } else if (n === 1) {
            result = false;
        } else {
            find(n - 2);
        }
    }
    find(numberAbs);
    return result;
}
console.log("50 isEven - this is ", isEven(50));
console.log("75 isEven - this is ", isEven(75));
console.log("-1 isEven - this is ", isEven(-1));
console.log("50 isEven - this is ", isEven(50));
console.log();
console.log("String counts:");
function countChar(str, char) {
    let countChar = 0;
    for (let index = 0; index < str.length; index++){
        if (str.charAt(index) === char) {
            countChar++;
        }
    }
    return countChar;
}
let testString = "BobBobbbb";
console.log("Count char B on string: " + testString + " = ", countChar(testString, "B"));
console.log();
console.log("The End.");