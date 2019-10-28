svg = document.getElementById("inline-arvore");

function draw_path(a, b){
    path = "M" + a[0] + " " + a[1] +
    "L" + b[0] + " " + b[1];
    p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttributeNS(null, "d", path);
    p.setAttributeNS(null, "stroke", "black");
    p.setAttributeNS(null, "stroke-width", 0.5);
    svg.appendChild(p);
}

function draw_recursive(a, b, theta){
    //draw the line a,b
    draw_path(a,b);

    //calculate extension of (a,b)
    l = [(b[0]- a[0]), (b[1] - a[1])];
    console.log(l);
    c = [(b[0] + l[0]/2),(b[1] + l[1]/2)];

    //calculate c_r and c_l (rotate c to left and right theta degrees)
    const c_r = [((c[0] - b[0])*Math.cos(theta) + (c[1] - b[1])*Math.sin(theta) + b[0]),
        (-(c[0] - b[0])*Math.sin(theta) + (c[1] - b[1])*Math.cos(theta) + b[1])];
    const c_l = [((c[0] - b[0])*Math.cos(theta) - (c[1] - b[1])*Math.sin(theta) + b[0]),
        ((c[0] - b[0])*Math.sin(theta) + (c[1] - b[1])*Math.cos(theta) + b[1])];
    
    //verify the size of the new path, if it's big enough, call recursive
    console.log((Math.pow(l[0], 2) + Math.pow(l[1],2))/2 );
    if( (Math.pow(l[0], 2) + Math.pow(l[1],2))/2 > 4){
        draw_recursive(b, c_r, theta);
        draw_recursive(b, c_l, theta);
    }
}

draw_recursive([200,400], [200,300], Math.PI/6);