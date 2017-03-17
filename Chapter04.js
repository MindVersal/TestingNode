/**
 * Created by isp_pia on 07.02.2017.
 */
console.log("Testing Chapter 04.");
console.log();
console.log("Testing Sum Range:");
function range(first, second){
    let arrayOfNumbers = [];
    let increment = (!isNaN(arguments[2]) && (arguments[2] !== 0) ? arguments[2] : 1);
    if ((increment > 0) && (first < second)) {
        for (let index = first; index <= second; index += increment) {
            arrayOfNumbers.push(index);
        }
    } else if ((increment > 0) && (first > second)) {
        for (let index = second; index >= first; index += increment){
            arrayOfNumbers.push(index);
        }
    } else if ((increment < 0) && (first < second)) {
        for (let index = second; index >= first; index += increment){
            arrayOfNumbers.push(index);
        }
    } else if ((increment < 0) && (first > second)) {
        for (let index = first; index <= second; index += increment){
            arrayOfNumbers.push(index);
        }
    } else {
        console.log("I don\'t known... ");
    }
    return arrayOfNumbers;
}
function sum(arrayForSum) {
    let sum = 0;
    for (let number = 0; number < arrayForSum.length; number++){
        sum += arrayForSum[number];
    }
    return sum;
}
console.log("Sum of range: ", range(1, 10, 0), " is ", sum(range(1, 10, 0)));
console.log("Sum of range: ", range(1, 10, -1), " is ", sum(range(1, 10, -1)));
console.log("Sum of range: ", range(1, 10, 1), " is ", sum(range(1, 10, 1)));
console.log("Sum of range: ", range(-10, 10, -1), " is ", sum(range(-10, 10, -1)));
console.log("Sum of range: ", range(-10, 10, 1), " is ", sum(range(-10, 10, 1)));
console.log();
console.log("Testing revers.");
function reverseArray(arrayForRevers) {
    let arrayAfterRevers = [];
    for (let index = (arrayForRevers.length - 1); index >= 0 ; index-- ){
        arrayAfterRevers.push(arrayForRevers[index]);
    }
    return arrayAfterRevers;
}
function reverseArrayInPlace(arrayForRevers) {
    for (let index = 0; index < (arrayForRevers.length / 2); index++){
        let temp = 0;
        temp = arrayForRevers[index];
        arrayForRevers[index] = arrayForRevers[arrayForRevers.length - index - 1];
        arrayForRevers[arrayForRevers.length - index - 1] = temp;
    }
    return arrayForRevers;
}
console.log(reverseArray(["A", "B", "C", "D", "E"]));
let arrayValue = [1, 2, 3, 4, 5];
console.log("arrayValue before reverse: " + arrayValue);
reverseArrayInPlace(arrayValue);
console.log("arrayValue after reverse: " + arrayValue);
console.log();
console.log("Testing Lists:");
function trimFront(arrayForTrim) {
    arrayForTrim.shift();
    return arrayForTrim;
}
function arrayToList(arrayList) {
    if (arrayList.length > 1){
        return {value: arrayList[0], rest: arrayToList(trimFront(arrayList))};
    } else if (arrayList.length == 1){
        return {value: arrayList[0], rest: null};
    } else {
        return {value: 0, rest: null};
    }
}
function listToArray(listToArray) {
    let arrayAfterList = [];
    let listTemp = listToArray;
    while (listTemp !== null) {
        arrayAfterList.push(listTemp.value);
        listTemp = listTemp.rest;
    }
    return arrayAfterList;
}
function prepend(number, list) {
    return {value: number, rest: list};
}
function nth(list, index) {
    let isFindValue = undefined;
    function find(listToFind, currentIndex) {
        if (listToFind === null) {
            return false;
        } else if (currentIndex === index) {
            isFindValue = listToFind.value;
            return true;
        } else {
            find(listToFind.rest, ++currentIndex);
        }
    }
    find(list, 0);
    return isFindValue;
}
console.log(arrayToList([1, 2, 3, 4, 5]));
console.log(arrayToList([1, 2, 3, 4]));
console.log(arrayToList([1, 2, 3]));
console.log(arrayToList([1, 2]));
console.log(arrayToList([1]));
console.log(arrayToList([]));
console.log(listToArray(arrayToList([1, 2, 3])));
console.log(listToArray(arrayToList([1, 2])));
console.log(listToArray(arrayToList([1])));
console.log(listToArray(arrayToList([])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log(nth(arrayToList([10, 20, 30, 40, 50]), 4));
console.log();
console.log("Testing Deep Equals.");
function deepEqual(objFirst, objSecond) {
    if ((null == objFirst) && (null == objSecond)) {
        return false;
    }
    if (typeof objFirst != "object" && typeof objSecond != "object"){
        return objFirst === objSecond;
    } else if (typeof objFirst != "object" || typeof objSecond != "object") {
        return false;
    }
    let propInObjFirst = 0;
    let propInObjSecond = 0;
    for (let prop in objFirst){
        propInObjFirst++;
    }
    for (let prop in objSecond){
        propInObjSecond++;
        if ( !(prop in objFirst) || !deepEqual(objFirst[prop], objSecond[prop])) {
            return false;
        }
    }
    return propInObjFirst == propInObjSecond;
}
let obj = {
    here: {
        is: "an"
    },
    object: 2
};
console.log(deepEqual(1, 1));
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
console.log();
console.log("The End.");