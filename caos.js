var svg = document.getElementById("inline-sierpinski");

//creating the triangle
triangle_path = "M 0 0 L 150 0 L 75 130 L 0 0"
sierpinski_t = document.createElementNS("http://www.w3.org/2000/svg", "path");
sierpinski_t.setAttributeNS(null, "d", triangle_path);
sierpinski_t.setAttributeNS(null, "fill", "none");
sierpinski_t.setAttributeNS(null, "stroke", "black");
sierpinski_t.setAttributeNS(null, "stroke-width", 1);
svg.appendChild(sierpinski_t);


function sier_create_circle(x, y){
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttributeNS(null, "r", 0.5);
    c.setAttributeNS(null, 'cx', x);
    c.setAttributeNS(null, 'cy', y);
    c.setAttributeNS(null, "fill", "black");
    svg.appendChild(c);
}

sier_active = 0;
n_pts = 1;
var first_pt, last_pt;
triangle_vert = [[0, 0], [150,0], [75, 130]];
    function sierpinski_update(){
       
        if(sier_active){
            n_pts++;
            if(n_pts < 6000){
                random_vert = triangle_vert[Math.floor(Math.random()*3)];
                new_pt = [(last_pt[0] + random_vert[0])/2, (last_pt[1] + random_vert[1])/2]
                sier_create_circle(new_pt[0], new_pt[1]);
                last_pt = new_pt;
            }
        }
    }

var myVar1 = setInterval(sierpinski_update, 1);



svg.addEventListener('click', function(e) {
    if(n_pts ==1){
        var pt = svg.createSVGPoint(), svgP;
        pt.x = e.clientX;
        pt.y = e.clientY;
        svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        console.log("hi");
        first_pt = [svgP.x, svgP.y];
        last_pt = first_pt;
        sier_active = 1;
        sier_create_circle(first_pt[0], first_pt[1]);
    }
}, false);