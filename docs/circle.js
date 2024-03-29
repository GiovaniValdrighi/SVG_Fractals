var svg = document.getElementById("circle-inline");
var zoom_center = 205;
var active = 0;
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
create_circle("c-0-0", 70, 150, 100);
circle_ar[0] = new Array();
circle_ar[0].push("c-0-0");
ind++;
depth = circle_ar.length;

function update_scale(){
    


    //if the simulation is active
    if(active == 1){

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
        if(r_min >1){
            circle_ar[circle_ar.length] = new Array();

            //run every small circle
            for(let i = 0; i < circle_ar[circle_ar.length-2].length; i++){
                c = document.getElementById(circle_ar[circle_ar.length -2][i]);
                x = parseFloat(c.getAttributeNS(null, "cx"));

                //checking if it is in the viewbox
                if( (x - r_min > 0) && (x + r_min < 300)){
                    ind++;
                    circle_ar[circle_ar.length-1].push("c-"+depth+"-"+ind);
                    create_circle("c-"+depth+"-"+ind, r_min/2, x - r_min, 100);
                    ind++;
                    circle_ar[circle_ar.length-1].push("c-"+depth+"-"+ind);
                    create_circle("c-"+depth+"-"+ind, r_min/2, x + r_min, 100);
                }
            }
            depth++;
        }
    }
}

var myVar = setInterval(update_scale, 50);

