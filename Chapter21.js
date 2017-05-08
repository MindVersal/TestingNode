/**
 * Created by mindversal on 08.05.2017.
 */
console.log("Chapter 21.");
console.log();
let garble = require("./garble");
let argument = null;
if (process.argv[2]) {
    argument = process.argv[2];
} else {
    argument = process.argv[1];
}
console.log("\nArgument before: " + argument +
            "\nArgument after: " + garble(argument));
console.log("\nTest Figlet.");
// let figlet = require("figlet");
// figlet.text("Hello world!", function (error, data) {
//     if (error){
//         console.error(error);
//     } else {
//         console.log(data);
//     }
// });
let fs = require("fs");
fs.readFile("mountains.js", "utf8",function (error, text) {
    if (error){
        throw error;
    }
    console.log("In file: ", text);
});
fs.readFile("garble.js", function (error, buffer) {
    if (error) {
        throw error;
    }
    console.log("\nIn file: ", buffer.length, " bytes.",
                "\nAnd first byte is: ", buffer[0]);
});
fs.writeFile("example/graffiti.txt", "Hello from Node.", function (error) {
    if (error){
        console.log("\nSorry, but will have error: ", error);
    } else {
        console.log("\nWriting in finish.");
    }
});
console.log();
console.log("Testing HTTP.");

console.log();
console.log("THE END.");