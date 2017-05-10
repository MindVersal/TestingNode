/**
 * Created by isp_pia on 10.05.2017.
 */
console.log("Chapter 22.");
console.log();
let http = require("http");
let Router = require("./router");
let ecstatic = require("ecstatic");
let fileServer = ecstatic({root, "./public"});
let router = new Router();
 http.createServer(function (request, response) {
     if (!router.resolve(request, response)){
         fileServer(request, response);
     }
 }).listen(8000);
function respond(response, status, data, type) {
    response.writeHead(status, {
        "Content-Type": type || "text/plain"
    });
    response.end(data);
}
function responseJSON(response, status, data) {
    respond(response, status, JSON.stringify(data), "application/json");
}

console.log();
console.log("THE END.");