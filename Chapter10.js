/**
 * Created by isp_pia on 28.03.2017.
 */
"use strict";
console.log("Chapter 10.");
console.log();
function findDate(string) {
    let dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    let match = dateTime.exec(string);
    return new Date(Number(match[3]),
                    Number(match[2]) - 1,
                    Number(match[1]));
}
let stringForDate = "30-1-2003";
console.log("String: " + stringForDate + " after convert: \n" + findDate(stringForDate));
console.log();
console.log("Borobudur".replace(/[ou]/g, "a"));
console.log("Hopper, Grace\nMcCarthy, John\nRitchie, Dennis".replace(/([\w]+), ([\w]+)/g, "$2 $1"));
console.log();
let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function (str) {
    return str.toUpperCase();
}));
console.log();
let stock = "1 lemon, 2 cabbages and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1){
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0){
        amount = "no";
    }
    return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
console.log();
console.log("THE END.");