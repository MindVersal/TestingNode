/**
 * Created by isp_pia on 28.03.2017.
 */
//"use strict";
console.log("Chapter 09.");
console.log();
function promptDirection(question) {
    let result = (Math.random() < 0.5) ? "left" : "right" ;
    if (result.toLowerCase() === "left") return "L";
    if (result.toLowerCase() === "right") return "R";
    throw new Error("Wrong direction: " + result);
}
function look() {
    if (promptDirection("Where?") === "L"){
        return "Home";
    } else {
        return "Two Angry Beers.";
    }
}
try {
    console.log("Your look", look());
} catch (error){
    console.log("What is wrong - I don\'t known: " + error);
}
function InputError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";
function AssertionFailed(message) {
    this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);
function assert(test, message) {
    if (!test){
        throw new AssertionFailed(message);
    }
}
function lastElement(array) {
    assert(array.length > 0, "Empty array in lastElement.");
    return array[array.length - 1];
}
console.log();
console.log("Testing multiplication.");
function MultiplicatorUnitFailure() {
    this.message = "Unknown error by Multiplication."
    this.stack = (new Error()).stack;
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";
function primitiveMultiply(a, b) {
   if (Math.random() < 0.1){
       return a * b;
   } else {
       throw new MultiplicatorUnitFailure();
   }
}
function reliableMultiply(a, b) {
    for (;;){
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure){
                console.log("Catch MUF Error.");
            } else {
                throw e;
            }
        }
    }
}
console.log("ReliableMultiply: " + reliableMultiply(8, 8));
console.log();
console.log("Testing Close Box.");
let box = {
    locked: true,
    unlock: function () { this.locked = false; },
    lock: function () { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};
function withBoxUnlocked(body) {
    try {
        box.unlock();
        body();
    } finally {
        box.lock();
    }
}
withBoxUnlocked(function () {
    box.content.push("Gold");
    console.log("Push The Gold!");
});
try {
    withBoxUnlocked(function () {
        throw new Error("Pirates in the hole! Cancel!");
    });
} catch (error){
    console.log("Catch Error: " + error);
}
console.log("Box locked? Box : " + box.locked);
console.log();
console.log("THE END.");