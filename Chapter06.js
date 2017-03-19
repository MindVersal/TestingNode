/**
 * Created by mindversal on 22.02.2017.
 */
console.log("Program for printing table.\n");
function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}
function colWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function(max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}
function drawTable(rows) {
    let heights = rowHeights(rows);
    let widths = colWidths(rows);
    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }
    function drawRow(row, rowNum) {
        let blocks = row.map(function (cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}
function repeat(string, times) {
    let result = "";
    for (let i = 0; i < times; i++){
        result += string;
    }
    return result;
}
function TextCell(text) {
    this.text = text.split("\n");
}
TextCell.prototype.minWidth = function () {
    return this.text.reduce(function (width, line) {
        return Math.max(width, line.length);
    }, 0);
};
TextCell.prototype.minHeight = function () {
    return this.text.length;
};
TextCell.prototype.draw = function (width, height) {
    let result = [];
    for (let i = 0; i < height; i++){
        let line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};
function UnderlinedCell(inner) {
    this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function () {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function () {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height - 1)
        .concat([repeat("-", width)]);
};
function RTextCell(text) {
    TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height) {
    let result = [];
    for (let i = 0; i < height; i++){
        let line = this.text[i] || "";
        result.push(repeat(" ", width - line.length) + line);
    }
    return result;
};
function dataTable(data) {
    let keys = Object.keys(data[0]);
    let headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name));
    });
    let body = data.map(function (row) {
        return keys.map(function (name) {
            let value = row[name];
            if (typeof value == "number") {
                return new RTextCell(String(value));
            } else {
                return new TextCell(String(value));
            }
        });
    });
    return [headers].concat(body);
}
let MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"}
];
console.log("The Table:\n" + drawTable(dataTable(MOUNTAINS)));
console.log("\n\nVector:\n");
function Vector(x, y) {
    this.setX(x);
    this.setY(y);
}
Vector.prototype.setX = function (x) {
    this.x = x;
};
Vector.prototype.setY = function (y) {
    this.y = y;
};
Vector.prototype.getX = function () {
    return this.x;
};
Vector.prototype.getY = function () {
    return this.y;
};
Vector.prototype.plus = function (secondVector) {
    return new Vector( (this.getX() + secondVector.getX()), (this.getY() + secondVector.getY()) );
};
Vector.prototype.minus = function (secondVector) {
    return new Vector( (this.getX() - secondVector.getX()), (this.getY() - secondVector.getY()) );
};
Object.defineProperty(Vector.prototype, "length", {
    get: function () {
        return Math.sqrt( Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2) );
    }
});
let testVector = new Vector(3, 4);
console.log(testVector.getX());
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log("Length of Vector is: " + testVector.length);
console.log("\nStretchCell:");
function StretchCell(inner, width, height) {
    this.inner = inner;
    this.minWidthConst = width;
    this.minHeightConst = height;
}
StretchCell.prototype.minWidth = function () {
    return (this.minWidthConst < this.inner.minWidth()) ? this.inner.minWidth() : this.minWidthConst;
};
StretchCell.prototype.minHeight = function () {
    return (this.minHeightConst < this.inner.minHeight()) ? this.inner.minHeight() : this.minHeightConst;
};
StretchCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height);
};
let sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log("StretchCell minWidth: " + sc.minWidth());
console.log("StretchCell minHeight: " + sc.minHeight());
console.log("StretchCell draw: " + sc.draw(3, 2));
console.log("\nInterface for Array:");
function MyArray(array) {
    this.array = array;
    this.current = 0;
}
Object.defineProperty(MyArray.prototype, "eof", {
    get: function () {
        return this.current >= this.array.length;
    }
});
Object.defineProperty(MyArray.prototype, "hasNext", {
    get: function () {
        return (this.current < this.array.length);
    }
});
Object.defineProperty(MyArray.prototype, "next", {
    get: function () {
        if (this.hasNext) {
            this.current++;
            return this.array[this.current - 1];
        } else {
            return NaN;
        }
    }
});
Object.defineProperty(MyArray.prototype, "start", {
   get: function () {
       this.current = 0;
   }
});
MyArray.prototype.printAll = function () {
    while (this.hasNext) {
        console.log(this.next);
    }
};
function ArraySeq(array) {
    MyArray.call(this, array);
}
ArraySeq.prototype = Object.create(MyArray.prototype);
function RangeSeq(startSeq, endSeq) {
    let tempArray = [];
    indexTempArray = startSeq;
    if (startSeq <= endSeq) {
        while (indexTempArray <= endSeq){
            tempArray.push(indexTempArray);
            indexTempArray++;
        }
    } else {
        while (indexTempArray >= endSeq){
            tempArray.push(indexTempArray);
            indexTempArray--;
        }
    }
    MyArray.call(this, tempArray);
}
RangeSeq.prototype = Object.create(MyArray.prototype);
function logFive(myArray) {
    let indexTemp = 0;
    while (myArray.hasNext){
        if (indexTemp < 5) {
            console.log(myArray.next);
            indexTemp++;
        } else {
            break;
        }
    }
}
let testArray = new ArraySeq([1, 2, 3]);
console.log("Test for ArraySeq:");
testArray.printAll();
let testRangeSeq = new RangeSeq(1, 5);
console.log("Test for RangeSeq:");
testRangeSeq.printAll();
console.log("Test logFive for ArraySeq: ");
logFive(new ArraySeq([1, 2]));
console.log("Test logFive for RangeSeq: ");
logFive(new RangeSeq(100, 1000));
console.log("\nThe End.");