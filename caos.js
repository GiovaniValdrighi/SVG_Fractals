var svg = document.getElementById("inline-sierpinski");

//creating the triangle
triangle_path = "M 0 130 L 150 130 L 75 0 L 0 130"
sierpinski_t = document.createElementNS("http://www.w3.org/2000/svg", "path");
sierpinski_t.setAttributeNS(null, "d", triangle_path);
sierpinski_t.setAttributeNS(null, "fill", "none");
sierpinski_t.setAttributeNS(null, "stroke", "black");
sierpinski_t.setAttributeNS(null, "stroke-width", 1);
svg.appendChild(sierpinski_t);

pentagon_path = "M 170 130 L 255 130 L 281 49 L 212 0 L 145 49 L 170 130"
sierpinski_p = document.createElementNS("http://www.w3.org/2000/svg", "path");
sierpinski_p.setAttributeNS(null, "d", pentagon_path);
sierpinski_p.setAttributeNS(null, "fill", "none");
sierpinski_p.setAttributeNS(null, "stroke", "black");
sierpinski_p.setAttributeNS(null, "stroke-width", 1);
svg.appendChild(sierpinski_p);

function sier_create_circle(x, y){
    c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttributeNS(null, "r", 0.5);
    c.setAttributeNS(null, 'cx', x);
    c.setAttributeNS(null, 'cy', y);
    c.setAttributeNS(null, "fill", "black");
    svg.appendChild(c);
}

sier_active = 0;
penta_active = 0;
n_pts1 = 1;
n_pts2 = 1;
var first_pt_triangle, current_pt_triangle, first_pt_penta, current_pt_penta, r_ind, r_last;
triangle_vert = [[0, 130], [150,130], [75, 0]];
pentagon_vert = [[170, 130], [255, 130], [281, 49], [212, 0], [145, 49]];
    function sierpinski_update(){
       
        if(sier_active){
            n_pts1++;
            if(n_pts1 < 3000){
                random_vert = triangle_vert[Math.floor(Math.random()*3)];
                new_pt_t = [(current_pt_triangle[0] + random_vert[0])/2, (current_pt_triangle[1] + random_vert[1])/2]
                sier_create_circle(new_pt_t[0], new_pt_t[1]);
                current_pt_triangle = new_pt_t;
            }
        }

        if(penta_active){
            n_pts2++;
            if(n_pts2 < 6000){
                r_ind = Math.floor(Math.random()*5);
                if(r_ind == r_last){r_ind = Math.floor(Math.random()*5)};
                if(r_ind == r_last){r_ind = Math.floor(Math.random()*5)};
                if(r_ind == r_last){r_ind = Math.floor(Math.random()*5)};
                r_last = r_ind;
                random_vert = pentagon_vert[r_ind ];
                new_pt_p = [(current_pt_penta[0] + random_vert[0])/2, (current_pt_penta[1] + random_vert[1])/2]
                sier_create_circle(new_pt_p[0], new_pt_p[1]);
                current_pt_penta = new_pt_p;
            }
        }
    }

var myVar1 = setInterval(sierpinski_update, 1);



svg.addEventListener('click', function(e) {
    if(n_pts1 ==1){
        var pt = svg.createSVGPoint(), svgP;
        pt.x = e.clientX;
        pt.y = e.clientY;
        svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        first_pt_triangle = [svgP.x, svgP.y];
        current_pt_triangle = first_pt_triangle;
        first_pt_penta = first_pt_triangle;
        current_pt_penta = first_pt_triangle;
        sier_active = 1;
        penta_active = 1;
        sier_create_circle(first_pt_triangle[0], first_pt_triangle[1]);
    }
}, false);