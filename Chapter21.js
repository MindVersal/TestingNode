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
let figlet = require("figlet");
figlet.text("Hello world!", function (error, data) {
    if (error){
        console.error(error);
    } else {
        console.log(data);
    }
});
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
let http = require("http");
// let server = http.createServer(function (request, response) {
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("<h1>Hello!</h1><p>You request: ' " +
//                 request.url + "'</p>");
//     response.end();
// });
// server.listen(8000);
// let request = http.request({
//     hostname: "eloquentjavascript.net",
//     path: "/20_node.html",
//     method: "GET",
//     headers: {Accept: "text/html"}
// }, function (response) {
//     console.log("Service answer with code: ", response.statusCode);
// });
// request.end();
// http.createServer(function (request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     request.on("data", function (chunk) {
//         response.write(chunk.toString().toUpperCase());
//     });
//     request.on("end", function () {
//         response.end();
//     });
// }).listen(8000);
// let request = http.request({
//     hostname: "localhost",
//     port: 8000,
//     method: "POST"
// }, function (response) {
//     response.on("data", function (chunk) {
//         process.stdout.write(chunk.toString());
//     });
// });
// request.end("Hello server.");
let Promise = require("promise");

let methods = Object.create(null);
http.createServer(function (request, response) {
    respondTo(request).then(function (data) {
        if (data.body && data.body.pipe){
            data.body.pipe(response);
        } else {
            response.end(data.body);
        }
    }, function (error) {
        response.writeHead(500);
        response.end(error.toString());
        console.log("Response failed: ", error.stack);
    });
}).listen(8000);
function respondTo(request) {
    if (request.method in methods){
        return methods[request.method](urlToPath(request.url), request);
    } else {
        return Promise.resolve({code: 405,
                body: "Method " + request.method + " not allowed."});
    }
}
function urlToPath(url) {
    let path = require("url").parse(url).pathname;
    let decoded = decodeURIComponent(path);
    return "." + decoded.replace(/(\/|\\)\.\.(\/\|\\|$)/g, "/");
}
let fsp = {};
["stat", "readdir", "rmdir", "unlink", "mkdir"].forEach(function (method) {
    fsp[method] = Promise.denodeify(fs[method]);
});
function inspectPath(path) {
    return fsp.stat(path).then(null, function (error) {
        if (error.code === "ENOENT") {
            return null;
        } else {
            throw error;
        }
    })
}
methods.GET = function (path) {
    return inspectPath(path).then(function (stats) {
        if (!stats){
            return {code: 404, body: "File not found."};
        } else if (stats.isDirectory()){
            return fsp.readdir(path).then(function (files) {
                return {code: 200, body: files.join("\n")};
            });
        } else {
            return {code: 200,
                    type: require("mime").lookup(path),
                    body: fs.createReadStream(path)};
        }
    });
};
let noContent = {code: 204};
function returnNoContent() {
    return noContent;
}
methods.DELETE = function (path) {
    return inspectPath(path).then(function (stats) {
        if (!stats){
            return noContent;
        } else if (stats.isDirectory()){
            return fsp.rmdir(path).then(returnNoContent);
        } else {
            return fsp.unlink(path).then(returnNoContent);
        }
    });
};
methods.PUT = function (path, request) {
    return new Promise(function (success, failure) {
        let outStream = fs.createWriteStream(path);
        outStream.on("error", failure);
        outStream.on("finish", success.bind(null, noContent));
        request.pipe(outStream);
    });
};
methods.MKCOL = function (path, request) {
    return inspectPath(path).then(function (stats) {
        if (!stats){
            return fsp.mkdir(path).then(returnNoContent);
        }
        if (stats.isDirectory()){
            return noContent;
        } else {
            return {code: 400, body: "File exists."};
        }
    });
};
function readStreamAsString(stream, callback) {
    let content = "";
    stream.on("data", function (chunk) {
        content += chunk;
    });
    stream.on("end", function () {
        callback(null, content);
    });
    stream.on("error", function (error) {
        callback(error);
    });
}
console.log("\nTesting any content-type:");
["text/plain", "text/html", "application/json",
        "application/rainbows+unicorns"].forEach(function (type) {
    http.request({
        hostname: "eloquentjavascript.net",
        path: "/author",
        headers: {Accept: type}
    }, function (response) {
        if (response.statusCode !== 200){
            console.error("Request for " + type + " failed: " +
                response.statusMessage);
            return;
        }
        readStreamAsString(response, function (error, content) {
            if (error){
                throw error;
            }
            console.log("Type" + type + ": " + content);
        });
    }).end();
});

console.log();
console.log("THE END.");