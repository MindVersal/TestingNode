function request(options, callback) {
    let req = new XMLHttpRequest();
    req.open(options.method || "GET", options.pathname, true);
    req.addEventListener("load", function () {
        if (req.status < 400){
            callback(null, req.responseText);
        } else {
            callback(new Error("Request failed: " + req.statusText));
        }
    });
    req.addEventListener("error", function () {
        callback(new Error("Network error"));
    });
    req.send(options.body || null);
}
let lastServerTime = 0;
request({pathname: "talks"}, function (error, response) {
    if (error){
        reportError(error);
    } else {
        response = JSON.parse(response);
        displayTalks(response.talks);
        lastServerTime = response.serverTime;
        waitForChanges();
    }
});
function reportError(error) {
    if (error){
        alert(error.toString());
    }
}
let talkDiv = document.querySelector("#talks");
let shownTalks = Object.create(null);
function displayTalks(talks) {
    talks.forEach(function (talk) {
        let shown = shownTalks[talk.title];
        if (talk.deleted){
            if (shown){
                talkDiv.replaceChild(shown);
                delete shownTalks[talk.title];
            }
        } else {
            let node = drawTalk(talk);
            if (shown){
                talkDiv.replaceChild(node, shown);
            } else {
                talkDiv.appendChild(node);
            }
            shownTalks[talk.title] = node;
        }
    });
}



