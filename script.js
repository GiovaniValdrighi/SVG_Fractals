var svg = document.getElementById("inline");

function circle_obj(id, r, x, y, scale){
    this.id = id;
    this.r = r;
    this.x = x;
    this.y = y;
    this.scale = scale;
}

function create_circle(id, r, x, y){
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttributeNS(null, 'id', id)
    c.setAttributeNS(null, 'r', r);
    c.setAttributeNS(null, 'cx', x);
    c.setAttributeNS(null, 'cy', y);
    c.setAttributeNS(null, "stroke", "black");
    c.setAttributeNS(null, 'stroke-width', 0.5);
    c.setAttributeNS(null, "fill", "none");
    svg.appendChild(c);
}

var circle_ar = new Array();
var min_r = 10000;
var depth = 0;
function generate_circles(r, x ,y){
    min_r = r < min_r ? r : min_r;
    circle_ar.push(new circle_obj("c"+depth, r, x, y, 1));
    create_circle("c"+depth,r, x, y);
    depth = circle_ar.length;
    if (r > 2){
        generate_circles(r/2, x-r, y);
        generate_circles(r/2, x+r, y);
    }
}


generate_circles(70, 150, 150);
console.log(min_r);
console.log(depth);

function update_scale(){
    for(let i = 0; i < circle_ar.length; i++){
        c = document.getElementById("c" + i);
        x = parseFloat(c.getAttributeNS(null, "cx"));
        //mudando o raio
        r = parseFloat(c.getAttributeNS(null, "r"));
        c.setAttributeNS(null, "r", r + r/10);
        //mudando o x
        dist = Math.abs((150 - x)/r);
        if (x > 150){
            c.setAttributeNS(null, "cx", x + dist*r/10);
        }else if (x < 150){
            c.setAttributeNS(null, "cx", x - dist*r/10);
        }
    }
}

var myVar = setInterval(update_scale, 50);