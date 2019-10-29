svg = document.getElementById("inline-arvore");
slider = document.getElementById("slider");
n_branch = 3;

var line = function(id, size, transform){
    this.id = id;
    this.size = size;
    this.transform = transform;
    this.left = null;
    this.right = null;
    this.middle = null;
}

function draw_path(size, id, transform, stroke){
    path = "M 0 0" +
    "L 0 " + size;
    p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttributeNS(null, "id", id);
    p.setAttributeNS(null, "d", path);
    p.setAttributeNS(null, "transform", transform);
    p.setAttributeNS(null, "stroke", "black");
    p.setAttributeNS(null, "stroke-width", stroke);
    svg.appendChild(p);
}


function draw_recursive(size, theta, transform, line_obj, stroke){
    ind++;
    id = "l-"+ind;
    //draw the line a,b
    draw_path(size, id, transform, stroke);
    line_obj.id = id;
    line_obj.transform = transform;
    line_obj.size = size;

    //translate the origin to the end of the new line
    transform = transform + "translate(0 " + size +") ";

   
    //verify the size of the new path, if it's big enough, call recursive
    if(Math.abs(size) > 0.6){
        const transform_r = transform + "rotate(" + theta + ") ";
        const transform_l = transform + "rotate(-" + theta + ") ";
        line_obj.left = new line();
        line_obj.right = new line();
        draw_recursive(size*0.5, theta, transform_l, line_obj.left, stroke*0.8);
        draw_recursive(size*0.5, theta, transform_r, line_obj.right, stroke*0.8);
        if(n_branch == 3) {
            line_obj.middle = new line();
            draw_recursive(size*0.5, theta, transform, line_obj.middle, stroke*0.8);}
    }
}


function update(){
    theta = slider.value;
    update_recursive(theta, "translate(60 142)", root, 0);
}

function update_recursive(theta, transform, line_obj, random){
    //change the transform of the current object
    l = document.getElementById(line_obj.id);
    l.setAttributeNS(null, "transform", transform);
    
    if(line_obj.left){
        transform = transform + "translate(0 " + line_obj.size + ") ";
        if(random){theta = Math.random()*30+20};
        const transform_r = transform + "rotate(" + theta + ") ";
        if(random){theta = Math.random()*30+20};
        const transform_l = transform + "rotate(-" + theta + ") ";
        update_recursive(theta, transform_r, line_obj.right, random);
        update_recursive(theta, transform_l, line_obj.left, random);
        if(n_branch == 3) {
            update_recursive(theta, transform, line_obj.middle, random);}
    } 
}

function random(){
    theta = Math.random()*30+20;
    update_recursive(theta, "translate (60 142)", root, 1);
}

ind = 0;
var root = new line()
draw_recursive(-64, 30, "translate(60 142)", root, 0.5);

