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
function stripComment(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComment("1 + /* 2 */3"));
console.log(stripComment("x = 10; // ten!"));
console.log(stripComment("1 /* a */ + /* b */ 1"));
console.log();
let name = "dead+h1[]rd";
let text = "Dead+h1[]rd have a scar on forehead.";
let escaped = name.replace(/[^\w\s]/g, "\\$&");
let regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
console.log();
let input = "String with 3 numbers ... 42 and 88.";
let number = /\b(\d+)\b/g;
let match;
console.log(input);
while (match = number.exec(input)){
    console.log("Found ", match[1], " on ", match.index);
}
console.log();
let str_ini = "searchengine=http://www.google.com/search?q=$1\
spitefulness=9.7\
\
; перед комментариями ставится точка с запятой\
; каждая секция относится к отдельному врагу\
    [larry]\
fullname=Larry Doe\
type=бычара из детсада\
website=http://www.geocities.com/CapeCanaveral/11451\
\
[gargamel]\
fullname=Gargamel\
type=злой волшебник\
outputdir=/home/marijn/enemies/gargamel";
function parseINI(string) {
    let currentSection = {name: null, fields: []};
    let categories = [currentSection];
    string.split(/\r?\n/).forEach(function (line) {
        let match;
        if (/^\s*(;.*)?$/.test(line)){
            return;
        } else if (match = line.match(/^\[(.*)\]$/)){
            currentSection = {name: match[1], fields: []};
            categories.push(currentSection);
        } else if (match = line.match(/^(\w+)=(.*)$/)){
            currentSection.fields.push({name: match[1], value: match[2]});
        } else {
            throw new Error("String \'" + line + "\' have wrong data.");
        }
    });
    return categories;
}
console.log(parseINI(str_ini));
console.log();
function verify(regexp, yes, no) {
    if (regexp.source === "...") return;
    yes.forEach(function (s) {
        if (!regexp.test(s)){
            console.log("Not found \'" + s + "\'");
        }
    });
    no.forEach(function (s) {
        if (regexp.test(s)){
            console.log("Surprise found \'" + s + "\'");
        }
    });
}
verify(/.../,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/.../,
    ["pop culture", "mad props"],
    ["plop"]);

verify(/.../,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/.../,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/.../,
    ["bad punctuation ."],
    ["escape the dot"]);

verify(/.../,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

verify(/.../,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape"]);
console.log();
console.log("THE END.");



























