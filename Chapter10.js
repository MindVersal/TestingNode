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
console.log("THE END.");