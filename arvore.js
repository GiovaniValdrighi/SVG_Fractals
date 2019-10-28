svg = document.getElementById("inline-arvore");
slider = document.getElementById("slider");
n_branch = 3;

var line = function(id, a, b, c){
    this.id = id;
    this.st_pt = a;
    this.fn_pt = b;
    this.rotated_fn_pt = c;
    this.left = null;
    this.right = null;
}

function draw_path(a, b, id){
    path = "M" + a[0] + " " + a[1] +
    "L" + b[0] + " " + b[1];
    p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttributeNS(null, "id", id);
    p.setAttributeNS(null, "d", path);
    p.setAttributeNS(null, "stroke", "black");
    p.setAttributeNS(null, "stroke-width", 0.5);
    svg.appendChild(p);
}


function draw_recursive(a, b, theta, line_obj){
    ind++;
    id = "l-"+ind;
    //draw the line a,b
    draw_path(a,b, id);

    //create the line object
    line_obj.st_pt = a;
    line_obj.fn_pt = b;
    line_obj.id = id;
    line_obj.right = new line();
    line_obj.left = new line();


    //calculate extension of (a,b)
    l = [(b[0]- a[0]), (b[1] - a[1])];
   
    //verify the size of the new path, if it's big enough, call recursive
    if( (Math.pow(l[0], 2) + Math.pow(l[1],2))/2 > 1){

        const c = [(b[0] + l[0]/2),(b[1] + l[1]/2)];

        //calculate c_r and c_l (rotate c to left and right theta degrees)
        const c_r = [((c[0] - b[0])*Math.cos(theta) + (c[1] - b[1])*Math.sin(theta) + b[0]),
            (-(c[0] - b[0])*Math.sin(theta) + (c[1] - b[1])*Math.cos(theta) + b[1])];
        const c_l = [((c[0] - b[0])*Math.cos(theta) - (c[1] - b[1])*Math.sin(theta) + b[0]),
            ((c[0] - b[0])*Math.sin(theta) + (c[1] - b[1])*Math.cos(theta) + b[1])];
        
        draw_recursive(b, c_r, theta, line_obj.right);
        draw_recursive(b, c_l, theta, line_obj.left);
        if(n_branch == 3) {draw_recursive(b, c, theta);}
    }
}


ind = 0;
line_obj = new line();

//draw_recursive([100, 400], [100, 300], Math.PI/6, line_obj);

var line2 = function(id, size, transform){
    this.id = id;
    this.size = size;
    this.transform = transform;
    this.left = null;
    this.right = null;
    this.middle = null;
}

function draw_path2(size, id, transform){
    path = "M 0 0" +
    "L 0 " + size;
    p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttributeNS(null, "id", id);
    p.setAttributeNS(null, "d", path);
    p.setAttributeNS(null, "transform", transform);
    p.setAttributeNS(null, "stroke", "black");
    p.setAttributeNS(null, "stroke-width", 0.5);
    svg.appendChild(p);
}


function draw_recursive2(size, theta, transform, line_obj){
    ind++;
    id = "l-"+ind;
    //draw the line a,b
    draw_path2(size, id, transform);
    line_obj.id = id;
    line_obj.transform = transform;
    line_obj.size = size;

    //translate the origin to the end of the new line
    transform = transform + "translate(0 " + size +") ";

   
    //verify the size of the new path, if it's big enough, call recursive
    if(size > 2){
        const transform_r = transform + "rotate(" + theta + ") ";
        const transform_l = transform + "rotate(-" + theta + ") ";
        line_obj.left = new line2();
        line_obj.right = new line2();
        draw_recursive2(size*0.66, theta, transform_l, line_obj.left);
        draw_recursive2(size*0.66, theta, transform_r, line_obj.right);
        if(n_branch == 3) {
            line_obj.middle = new line2();
            draw_recursive2(size*0.66, theta, transform, line_obj.middle);}
    }
}

var root = new line2()
draw_recursive2(32, 30, "translate(50 10)", root);
console.log(root);

function update(){
    theta = slider.value;
    update_recursive(theta, "translate(50 10)", root);
}

function update_recursive(theta, transform, line_obj){
    //change the transform of the current object
    l = document.getElementById(line_obj.id);
    l.setAttributeNS(null, "transform", transform);
    
    if(line_obj.left){
        transform = transform + "translate(0 " + line_obj.size + ") ";
        const transform_r = transform + "rotate(" + theta + ") ";
        const transform_l = transform + "rotate(-" + theta + ") ";
        update_recursive(theta, transform_r, line_obj.right);
        update_recursive(theta, transform_l, line_obj.left);
        if(n_branch == 3) {
            update_recursive(theta, transform, line_obj.middle);}
    } 
}