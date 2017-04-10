/**
 * Created by isp_pia on 10.04.2017.
 */
;(function () {
    function talksAbout(node, string) {
        if (node.nodeType == document.ELEMENT_NODE) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (talksAbout(node.childNodes[i], string))
                    return true;
            }
            return false;
        } else if (node.nodeType == document.TEXT_NODE) {
            return node.nodeValue.indexOf(string) > -1;
        }
    }

    console.log(talksAbout(document.body, "кни"));
})();



