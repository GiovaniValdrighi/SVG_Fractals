var svgObject = document.getElementById('svg-imagem');
svgObject.addEventListener("load", function(){
    console.log(svgObject);
    console.log(svgObject.contentDocument);
    var svg = svgObject.contentDocument.getElementById("svg8");

    console.log(svg);
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttributeNS(null, "r", 50);
    c.setAttributeNS(null, "cx", 50);
    c.setAttributeNS(null, "cy", 100);
    c.setAttributeNS(null, "fill", "black");

    svg.appendChild(c);
});