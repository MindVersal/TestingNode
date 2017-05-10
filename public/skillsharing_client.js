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
function instantiateTemplate(name, values) {
    function instantiateText(text) {
        return text.replace(/\{\{(\w+)\}\}/g, function (_, name) {
            return values[name];
        });
    }
    function instantiate(node) {
        if (node.nodeType === document.ELEMENT_NODE){
            let copy = node.cloneNode();
            for (let i = 0; i < node.childNodes.length; i++){
                copy.appendChild(instantiate(node.childNodes[i]));
            }
            return copy;
        } else if (node.nodeType === document.TEXT_NODE){
            return document.createTextNode(instantiateText(node.nodeValue));
        }
    }
    let template = document.querySelector("#template ." + name);
    return instantiate(template);
}
function drawTalk(talk) {
    let node = instantiateTemplate("talk", talk);
    let comments = node.querySelector(".comments");
    talk.comments.forEach(function (comment) {
        comments.appendChild(instantiateTemplate("comment", comment));
    });
    node.querySelector("button.del").addEventListener("click", deleteTalk.bind(null, talk.title))
    let form = node.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        addComment(talk.title, form.elements.comment.value);
        form.reset();
    });
    return node;
}
function talkURL(title) {
    return "talks/" + encodeURIComponent(title);
}
function deleteTalk(title) {
    request({pathname: talkURL(title), method: "DELETE"}, reportError);
}
function addComment(title, comment) {
    let comment = {author: nameField.value, message: comment};
    request({pathname: talkURL(title) + "/commets",
            body: JSON.stringify(comment),
            method: "POST"},
                reportError);
}
let nameField = document.querySelector("#name");
nameField.value = localStorage.getItem("name") || "";
nameField.addEventListener("change", function () {
    localStorage.setItem("name", nameField.value);
});
let talkForm = document.querySelector("#newtalk");
talkForm.addEventListener("submit", function (event) {
    event.preventDefault();
    request({pathname: talkURL(talkForm.elements.title.value),
            method: "PUT",
            body: JSON.stringify({
                presenter: nameField.value,
                summary: talkForm.elements.summary.value
            })}, reportError);
    talkForm.reset();
});


































