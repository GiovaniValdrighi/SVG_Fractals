var svg = document.getElementById("inline-koch");
first_line = document.createElementNS("http://www.w3.org/2000/svg", "path");
first_line.setAttributeNS(null, "stroke", "black");
first_line.setAttributeNS(null, "stroke-width", 1);
first_line.setAttributeNS(null, "d", "M 10 150 L 170 150 M 330 150 L 490 150");
svg.appendChild(first_line);


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
    svg.appendChild(p);
    console.log("hi");

    return [[p0[0] + v0[0]/3, p0[1] + v0[1]/3 ],
           [p0[0] + v0[0]*2/3, p0[1] + v0[1]*2/3 ],
           [P[0] + v1[0]/3, p1[1] - v1[1]*2/3],
           [P[0] + v1[0]*2/3, p1[1] - v1[1]/3]]
}


function generate_paths(p0, p1, depth){
    
    depth++;
    const [p2, p3, p4, p5] = create_path(p0, p1);
    if(depth <= 5){
        generate_paths(p2, p3, depth);
        generate_paths(p4, p5, depth);
    }
}


generate_paths([170, 150], [330,150], 0);