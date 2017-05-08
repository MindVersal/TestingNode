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
let methods = Object.create(null);
http.createServer(function (request, response) {
    function respond(code, body, type) {
        if (!type) {
            type = "text/plain";
        }
        response.writeHead(code, {"Content-Type": type});
        if (body && body.pipe){
            body.pipe(response);
        } else {
            response.end(body);
        }
    }
    if (request.method in methods){
        methods[request.method](urlToPath(request.url), respond, request);
    } else {
        respond(405, "Method " + request.method + " not allowed.");
    }
}).listen(8000);
function urlToPath(url) {
    let path = require("url").parse(url).pathname;
    return "." + decodeURIComponent(path);
}
methods.GET = function (path, respond) {
    fs.stat(path, function (error, stats) {
        if (error && error.code === "ENOENT"){
            respond(404, "File not found");
        } else if (error){
            respond(500, error.toString());
        } else if (stats.isDirectory()){
            fs.readdir(path, function (error, files) {
                if (error){
                    respond(500, error.toString());
                } else {
                    respond(200, files.join("\n"));
                }
            });
        } else {
            respond(200, fs.createReadStream(path),
                require("mime").lookup(path));
        }
    });
};
methods.DELETE = function (path, respond) {
    fs.stat(path, function (error, stats) {
        if (error && error.code === "ENOENT"){
            respond(204);
        } else if (error){
            respond(500, error.toString());
        } else if (stats.isDirectory()){
            fs.rmdir(path, respondErrorOrNothing(respond));
        } else {
            fs.unlink(path, respondErrorOrNothing(respond));
        }
    })
};
function respondErrorOrNothing(respond) {
    return function (error) {
        if (error){
            respond(500, error.toString());
        } else {
            respond(204);
        }
    };
}
methods.PUT = function (path, respond, request) {
    let outStream = fs.createWriteStream(path);
    outStream.on("error", function (error) {
        respond(500, error.toString());
    });
    outStream.on("finish", function () {
        respond(204);
    });
    request.pipe(outStream);
};




console.log();
console.log("THE END.");