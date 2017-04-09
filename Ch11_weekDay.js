/**
 * Created by mindversal on 09.04.2017.
 */
let names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

exports.name = function(number) {
    return names[number];
};
exports.number = function(name) {
    return names.indexOf(name);
};