/**
 * Created by isp_pia on 06.04.2017.
 */
console.log("Chapter 11.");
console.log();
(function () {
    function square(x) { return x * x; }
    let hundred = 100;
    console.log(square(hundred));
})();
// let weekDayOld = function () {
//     let names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//     return {
//         name: function (number) { return names[number]; },
//         number: function (name) { return names.indexOf(name); }
//     };
// }();
// (function (exports) {
//     let names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//     exports.name = function (number) {
//         return names[number];
//     };
//     exports.number = function (name) {
//         return names.indexOf(name);
//     }
// })( this.weekDay = {} );
// console.log(weekDay.name(weekDay.number("Sunday")));
let plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));
console.log();
console.log("THE END.");