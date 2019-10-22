var svg = document.getElementById("inline");
var zoom_center = 205;
var ativo = 0;
var txt_info = document.getElementById("info");
function iniciar(){
    ativo = 1;
}

function pausar(){
    ativo = 0;
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
function generate_circles(depth, r, x ,y){

    //creating circle
    create_circle("c-"+depth+ "-"+ind, r, x ,y);

    //recursion update
    if( circle_ar[depth]){
        circle_ar[depth].push("c-" + depth + "-" + ind);
    }else{
        circle_ar[depth] = new Array();
        circle_ar[depth].push("c-" + depth + "-" + ind);
    }
    depth++;
    ind++;
    if (r > 2){
        generate_circles(depth, r/2, x-r, y);
        generate_circles(depth, r/2, x+r, y);
    }
}


function generate_circles_loop(depth, r, x, y){
    
    //creating circle
    create_circle("c-"+depth+ "-"+ind, r, x ,y);

    //recursion update
    if( circle_ar[depth]){
        circle_ar[depth].push("c-" + depth + "-" + ind);
    }else{
        circle_ar[depth] = new Array();
        circle_ar[depth].push("c-" + depth + "-" + ind);
    }
    depth++;
    ind++;
    if (r > 2){
        generate_circles(depth, r/2, x-r, y);
        generate_circles(depth, r/2, x+r, y);
    }
}

generate_circles(0, 70, 150, 150);
depth = circle_ar.length;
n_remov = 0;


function update_scale(){
    txt_info.innerHTML = "Depth:" + depth + "&emsp; Circles: " + ind;
    if(depth > 35){
        circle_ar = [];
    }
    if(ativo == 1){
        for(let i = 0; i< depth; i++){
            for(let j = 0; j< circle_ar[i].length; j++){
                c = document.getElementById(circle_ar[i][j]);
                r = parseFloat(c.getAttributeNS(null, "r"));
                x = parseFloat(c.getAttributeNS(null, "cx"));
                c.setAttributeNS(null, "r", r + r/22);
                c.setAttributeNS(null, "cx", x + (x-zoom_center)/22);
            }
        }

        c_min = document.getElementById(circle_ar[circle_ar.length-1][0]);
        r_min = parseFloat(c_min.getAttributeNS(null, "r"));
        if(r_min >2){
            circle_ar[circle_ar.length] = new Array();
            for(let i = 0; i < circle_ar[circle_ar.length-2].length; i++){
                c = document.getElementById(circle_ar[circle_ar.length-2][i]);
                x = parseFloat(c.getAttributeNS(null, "cx"));
                if( (x - r_min > 0) && (x + r_min < 300)){
                    ind++;
                    circle_ar[circle_ar.length-1].push("c-"+depth+"-"+ind);
                    create_circle("c-"+depth+"-"+ind, r_min/2, x - r_min, 150);
                    ind++;
                    circle_ar[circle_ar.length-1].push("c-"+depth+"-"+ind);
                    create_circle("c-"+depth+"-"+ind, r_min/2, x + r_min, 150);
                }
            }
            depth = circle_ar.length;
        }
    }
}

var myVar = setInterval(update_scale, 50);