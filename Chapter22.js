/**
 * Created by isp_pia on 10.05.2017.
 */
console.log("Chapter 22.");
console.log();
let http = require("http");
let Router = require("./router");
let ecstatic = require("ecstatic");
let fileServer = ecstatic({root: "./public"});
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
let talks = Object.create(null);
router.add("GET", /^\/talks\/([^\/]+)$/,
            function (request, response, title) {
    if (title in talks){
        responseJSON(response, 200, talks[title]);
    } else {
        respond(response, 404, "No talks '" + title + "' found.");
    }
});
router.add("DELETE", /^\/talks\/([^\/]+)$/,
            function (request, response, title) {
    if (title in talks){
        delete talks[title];
        registerChange(title);
    }
    respond(response, 204, null);
});
function readStreamAsJSON(stream, callback) {
    let data = "";
    stream.on("data", function (chunk) {
        data += chunk;
    });
    stream.on("end", function () {
        let result, error;
        try {
            result = JSON.parse(data);
        } catch (e){
            error = e;
        }
        callback(error, result);
    });
    stream.on("error", function (error) {
        callback(error);
    });
}
router.add("PUT", /^\/talks\/([^\/]+)$/,
            function (request, response, title) {
    readStreamAsJSON(request, function (error, talk) {
        if (error){
            respond(response, 400, error.toString());
        } else if (!talk ||
                    typeof talk.presenter !== "string" ||
                    typeof talk.summary !== "string"){
            respond(response, 400, "Bad talk data.");
        } else {
            talk[title] = {title: title,
                            presenter: talk.presenter,
                            summary: talk.summary,
                            comments: []};
            registerChange(title);
            respond(response, 204, null);
        }
    })
});
router.add("POST", /^\/talks\/([^\/]+)$/,
            function (request, response, title) {
    readStreamAsJSON(request, function (error, comment) {
        if (error){
            respond(response, 400, error.toString());
        } else if (!comment ||
                    typeof comment.author !== "string" ||
                    typeof comment.message !== "string"){
            respond(response, 400, "Bad comment data.");
        } else if(title in talks){
            talks[title].comments.push(comment);
            registerChange(title);
            respond(response, 204, null);
        } else {
            respond(response, 404, "No talks '" + title + "' found.")
        }
    })
});
























console.log();
console.log("THE END.");