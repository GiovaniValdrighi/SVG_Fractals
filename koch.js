var g = document.getElementById("koch-group");

function create_path(a, b){
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
    g.appendChild(p);

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


function generate_paths(p0, p1){
    depth = 0;
    ar_tuples[0] = [[p0, p1]];
    while (ar_tuples.length < depth_limit){
        aux = [];
        for(let i = 0; i < ar_tuples[ar_tuples.length-1].length; i++){
            Array.prototype.push.apply(aux, calculate_pts(ar_tuples[ar_tuples.length-1][i][0], ar_tuples[ar_tuples.length-1][i][1]));
        }
        ar_tuples.push(aux);
    }
    
    for(let i = 0; i < ar_tuples[ar_tuples.length-1].length; i++){
        create_path(ar_tuples[ar_tuples.length-1][i][0], ar_tuples[ar_tuples.length-1][i][1]);
    }
}

function koch_depth(){
    if (depth_limit < 8){
        g.innerHTML = "";
        depth_limit++;
        generate_paths([10, 150], [490,150]);
    }
}

depth_limit = 1;
ar_tuples = new Array();

generate_paths([10, 150], [490,150]);