/**
 * Created by isp_pia on 03.02.2017.
 */

console.log("Hello");
console.log();
console.log("Triangle:");
for (let countDiez = 1; countDiez <= 8; countDiez++){
    let stringDiez = "";
    for (let index = 1; index <= countDiez; index++){
        stringDiez += '#';
    }
    console.log(stringDiez);
}
console.log();
console.log("FizzBuzz:");
for (let indexNumber = 1; indexNumber <= 20; indexNumber++){
    if (indexNumber % 3 === 0) {
        console.log( (indexNumber % 5 === 0) ? "FizzBuzz" : "Fizz" );
    } else if (indexNumber % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(indexNumber);
    }
}
console.log();
console.log("Desk:");
let countRow = 12;
let countCol = 12;
for (let indexRow = 1; indexRow <= countRow; indexRow++){
    let stringRow = "";
    for (let indexCol = 1; indexCol <= countCol; indexCol++){
        stringRow += ((indexRow + indexCol) % 2 === 0) ? "#" : " ";
    }
    console.log(stringRow);
}
console.log();
console.log("The End.")