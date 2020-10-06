var nodes = [];
window.jsInteropCall = function() {
    return BINDING.js_to_mono_obj("Hello world");
}

window.changeHtmlView = function (loaderDiv, diagramDiv) {
    loaderDiv.parentElement.style.display = "none";
    diagramDiv.style.display = "block";
}

window.changeHelperVisiblity = function (visible) {
    document.getElementById('diagramhelperdiv').style.display = visible;
}

window.render = function (nodes) {
    var diagram = document.getElementById('diagramcontent');
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", 1000);
    svg.setAttribute("width", 1000);
    diagram.appendChild(svg);
    this.nodes = nodes;
    for (var i = 0; i < nodes.length; i++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("id", nodes[i].id);
        rect.setAttribute("width", nodes[i].width);
        rect.setAttribute("stroke", 'black');
        rect.setAttribute("stroke-width", 2);
        rect.setAttribute("fill", 'white');
        rect.setAttribute("height", nodes[i].height);
        rect.setAttribute("x", nodes[i].offsetX);
        rect.setAttribute("y", nodes[i].offsetY);
        svg.appendChild(rect);
        if (nodes[i].shape == "HTML") {
            var templateDiv = document.getElementById(nodes[i].id + "_template");
            var cloneTemplate = templateDiv.cloneNode(true);
            var htmlLayer = document.getElementById("diagram_htmlLayer_div");
            var nodeHtmlElement = document.createElement("div");
            nodeHtmlElement.setAttribute("id", nodes[i].id + "_html_element");
            var nodeHtmlContentElement = document.createElement("div");
            nodeHtmlContentElement.setAttribute("id", nodes[i].id + "_content_html_element");
            nodeHtmlContentElement.setAttribute("style", "position: absolute; transform: rotate(0deg); pointer - events: all; visibility: visible; opacity: 1;pointer-events: none;");
            nodeHtmlContentElement.style.width = nodes[i].width +"px";
            nodeHtmlContentElement.style.height = nodes[i].height + "px";
            nodeHtmlContentElement.style.left = nodes[i].offsetX + "px";
            nodeHtmlContentElement.style.top = nodes[i].offsetY + "px";
            templateDiv.style.pointerEvents = "all";
            nodeHtmlContentElement.appendChild(templateDiv);
            nodeHtmlElement.appendChild(nodeHtmlContentElement);
            htmlLayer.appendChild(nodeHtmlElement);
        }
    }
    var loaderDiv = document.getElementById("loader");
    var diagramDiv = document.getElementById("diagram");
    loaderDiv.parentElement.style.display = "none";
    diagramDiv.style.display = "block";

    //document.getElementById("DiagramTemplates").addEventListener('DOMSubtreeModified', function () {
    //    window.updateTemplate();
    //}, false);
}
window.updateHelper = function (helper) {
    var helperRect = document.getElementById("helper");
    if (helperRect == null) {
        var diagramhelperdiv = document.getElementById('diagramhelperdiv');
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", 1000);
        svg.setAttribute("width", 1000);
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("id", "helper");
        rect.setAttribute("x", helper.x);
        rect.setAttribute("y", helper.y);
        rect.setAttribute("width", helper.width);
        rect.setAttribute("height", helper.height);
        rect.setAttribute("stroke", 'black');
        rect.setAttribute("stroke-width", 2);
        rect.setAttribute("stroke-dasharray", "2,2");
        rect.setAttribute("fill", 'transparent');
        svg.appendChild(rect);
        diagramhelperdiv.appendChild(svg);
        //diagramhelperdiv.style.display = "block";
    } else {
        //document.getElementById('diagramhelperdiv').style.display = "block";
        helperRect.setAttribute("x", helper.x);
        helperRect.setAttribute("y", helper.y);
        helperRect.setAttribute("width", helper.width);
        helperRect.setAttribute("height", helper.height);
    }

}

window.update = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].shape == "HTML") {
            var nodeHtmlContentElement = document.getElementById(nodes[i].id + "_content_html_element");
            nodeHtmlContentElement.style.width = nodes[i].width + "px";
            nodeHtmlContentElement.style.height = nodes[i].height + "px";
            nodeHtmlContentElement.style.left = nodes[i].offsetX + "px";
            nodeHtmlContentElement.style.top = nodes[i].offsetY + "px";
        }
        var rect = document.getElementById(nodes[i].id);
        rect.setAttribute("id", nodes[i].id);
        rect.setAttribute("x", nodes[i].offsetX);
        rect.setAttribute("y", nodes[i].offsetY);
    }
}

//window.alertMethod = function () {
//    alert("Html Node");
//}
window.updateTemplate = function(nodes){
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].shape == "HTML") {            
            var nodeHtmlContentElement = document.getElementById(nodes[i].id + "_content_html_element");
            if (nodeHtmlContentElement.children) {
                for (var j = 0; j < nodeHtmlContentElement.children.length; j++) {
                    nodeHtmlContentElement.children[0].remove();
                }
            }
            var templateDiv = document.getElementById(nodes[i].id + "_template");
            var cloneTemplate = templateDiv.cloneNode(true);
            nodeHtmlContentElement.appendChild(templateDiv);
        }
    }
}
window.getScrollSize = function(element) {
    var scrollSize = {};
    scrollSize["X"] = element.scrollLeft;
    scrollSize["Y"] = element.scrollTop;
    return scrollSize;
}

window.getDiagramSize = function () {
    var element = document.getElementById("diagram");
    var bounds = element.getBoundingClientRect();
    var size = {};
    size["X"] = bounds.left;
    size["Y"] = bounds.top;
    return size;
}

