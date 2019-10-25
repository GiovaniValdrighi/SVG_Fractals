;
var svg = document.getElementById("inline");
var zoom_center = 205;
var active = 0;
var txt_info = document.getElementById("info-circles");
var slider = document.getElementById("slider");

function start(){
    active = 1;
}

function pause(){
    active = 0;
}

function change_center(){
    zoom_center = slider.value;
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

//array of the ids
var circle_ar = new Array();
var ind = 0;

//inicializating first circle
create_circle("c-0-0", 70, 150, 150);
circle_ar[0] = new Array();
circle_ar[0].push("c-0-0");
ind++;
depth = circle_ar.length;

function update_scale(){
    


    //if the simulation is active
    if(active == 1){
        //screen info
        txt_info.innerHTML = "Profundidade recurssão:" + depth;

        //for each circle, increase radius and zoom
        for(let i = 0; i< circle_ar.length; i++){
            for(let j = 0; j< circle_ar[i].length; j++){
                c = document.getElementById(circle_ar[i][j]);
                if(c){
                r = parseFloat(c.getAttributeNS(null, "r"));
                x = parseFloat(c.getAttributeNS(null, "cx"));

                //checking if the circle still in the viewbox
                if(((x+r >0) && (x+r < 300)) || ((x-r > 0) && (x-r <300))){
                    c.setAttributeNS(null, "r", r + r/50);
                    c.setAttributeNS(null, "cx", x + (x-zoom_center)/50);
                }else{
                    svg.removeChild(c);
                    circle_ar[i].splice(j, 1);
                }
                }
            }
        }

        if(!circle_ar[0].length){
            circle_ar.shift();
        }

        //getting smallest radius
        c_min = document.getElementById(circle_ar[circle_ar.length-1][0]);
        r_min = parseFloat(c_min.getAttributeNS(null, "r"));
        //if smallest radius is bigger than 2, create new circles
        if(r_min >2){
            circle_ar[circle_ar.length] = new Array();

            //run every small circle
            for(let i = 0; i < circle_ar[circle_ar.length-2].length; i++){
                c = document.getElementById(circle_ar[circle_ar.length -2][i]);
                x = parseFloat(c.getAttributeNS(null, "cx"));

                //checking if it is in the viewbox
                if( (x - r_min > 0) && (x + r_min < 300)){
                    ind++;
                    circle_ar[circle_ar.length-1].push("c-"+depth+"-"+ind);
                    create_circle("c-"+depth+"-"+ind, r_min/2, x - r_min, 150);
                    ind++;
                    circle_ar[circle_ar.length-1].push("c-"+depth+"-"+ind);
                    create_circle("c-"+depth+"-"+ind, r_min/2, x + r_min, 150);
                }
            }
            depth++;
        }
    }
}

var myVar = setInterval(update_scale, 50);




var svg2 = document.getElementById("inline-koch");


function create_path(p0, p1){
    //begin calculus
    //third point of equilateral triangle

    P = [((p1[0] - p0[0])/2 + (p1[1] - p0[1])*Math.sqrt(3)/2 + p0[0]), 
            (-(p1[0] - p0[0])*Math.sqrt(3)/2 + (p1[1] - p0[1])/2 + p0[1])];
    //vectors
    v0 = [P[0] - p0[0], P[1] - p0[1]];
    v1 = [p1[0] - P[0], p1[1] - P[1]];

    //create_circle(p0[0], p0[1]);
    //create_circle(p1[0], p1[1]);
    //create_circle(P[0], P[1]);
    //path
    d = "M" + (p0[0]) + " " + (p0[1]) + " "
        + "L" + (p0[0] + v0[0]/3) + " " + (p0[1] + v0[1]/3) + " "
        + "M" + (p0[0] + v0[0]*2/3) + " " + (p0[1] + v0[1]*2/3) + " "
        + "L" + (P[0]) + " " + (p0[1] + v0[1]) + " "
        + "L" + (P[0] + v1[0]/3) + " " + (p1[1] - v1[1]*2/3) + " " 
        + "M" + (P[0] + v1[0]*2/3) + " " + (p1[1] - v1[1]/3) + " "
        + "L" + (p1[0]) + " " + (p1[1]); 
    p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttributeNS(null, "stroke", "black");
    p.setAttributeNS(null, "stroke-width", 1);
    p.setAttributeNS(null, "d", d);
    p.setAttributeNS(null, "fill", "none");
    svg2.appendChild(p);
    console.log("hi");

    return [[p0[0] + v0[0]/3, p0[1] + v0[1]/3 ],
           [p0[0] + v0[0]*2/3, p0[1] + v0[1]*2/3 ],
           [P[0] + v1[0]/3, p1[1] - v1[1]*2/3],
           [P[0] + v1[0]*2/3, p1[1] - v1[1]/3]]
}

function create_path2(a, b){
    //begin calculus
    //next to points
    c = [(a[0]*2 + b[0])/3,(a[1]*2 + b[1])/3];
    d = [(a[0] + 2*b[0])/3,(a[1] + 2*b[1])/3];

    //the last point, top of the triangle
    e = [((d[0] - c[0])/2 + (d[1] - c[1])*Math.sqrt(3)/2 + c[0]), 
            (-(d[0] - c[0])*Math.sqrt(3)/2 + (d[1] - c[1])/2 + c[1])];

    //path
    path = "M" + (a[0]) + " " + (a[1]) + " "
        + "L" + (c[0]) + " " + (c[1]) + " "
        + "L" + (e[0]) + " " + (e[1]) + " "
        + "L" + (d[0]) + " " + (d[1]) + " "
        + "L" + (b[0]) + " " + (b[1]); 
    p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttributeNS(null, "stroke", "black");
    p.setAttributeNS(null, "stroke-width", 1);
    p.setAttributeNS(null, "d", path);
    p.setAttributeNS(null, "fill", "none");
    svg2.appendChild(p);

}


function calculate_pts(a, b){
    //begin calculus
    //next to points
    c = [(a[0]*2 + b[0])/3,(a[1]*2 + b[1])/3];
    d = [(a[0] + 2*b[0])/3,(a[1] + 2*b[1])/3];

    //the last point, top of the triangle
    e = [((d[0] - c[0])/2 + (d[1] - c[1])*Math.sqrt(3)/2 + c[0]), 
        (-(d[0] - c[0])*Math.sqrt(3)/2 + (d[1] - c[1])/2 + c[1])];

    return [[a,c],[c,e],[e,d], [d,b]]
}

depth_limit = 5;
ar_tuples = new Array();

function generate_paths(p0, p1){
    depth = 0;
    ar_tuples[0] = [[p0, p1]];
    while (ar_tuples.length < depth_limit){
        aux = [];
        for(let i = 0; i < ar_tuples[ar_tuples.length-1].length; i++){
            Array.prototype.push.apply(aux, calculate_pts(ar_tuples[ar_tuples.length-1][i][0], ar_tuples[ar_tuples.length-1][i][1]));
        }
        console.log(aux);
        ar_tuples.push(aux);
    }
    
    for(let i = 0; i < ar_tuples[ar_tuples.length-1].length; i++){
        create_path2(ar_tuples[ar_tuples.length-1][i][0], ar_tuples[ar_tuples.length-1][i][1]);
    }
}


generate_paths([10, 150], [490,150]);
console.log(ar_tuples);