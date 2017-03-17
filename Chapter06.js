/**
 * Created by isp_pia on 07.03.2017.
 */
console.log("Chapter 06.\n");
let blocks = [1, 2, 3, 4];
console.log(blocks.map(function (cell, colNum) {
    return " " + cell + "; ";
}).join("\n"));
console.log();
console.log("The End.");