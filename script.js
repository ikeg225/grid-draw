// Global Variables
let grid = document.querySelector("#grids");
let leftMouseButtonOnlyDown = false;
let back_color = "#FFFFFF";
let pen_color = "#000000";
let grid_num = 50;
const colors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];

// Checking if Left Click is Down
function setLeftButtonState(e) {
  leftMouseButtonOnlyDown = e.buttons === undefined 
    ? e.which === 1 
    : e.buttons === 1;
}

document.body.onmousedown = setLeftButtonState;
document.body.onmousemove = setLeftButtonState;
document.body.onmouseup = setLeftButtonState;

// Creates the Grid
function grider(num) {
    for (i = 0; i < num * num; i++) {
        const div = document.createElement('div');
        div.setAttribute("style", "background-color: " + back_color);
        grid.appendChild(div);
    };
}

grider(grid_num)

// Checks if Two Colors Are the same (Hex and RGBA are Different Formats)
function equal_color(rgb_clr, color2) {
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")";
    }
    return hexToRgb(color2) == rgb_clr
};


let allDivs = grid.querySelectorAll('div');
let is_random = false;
let is_shade = false;
let is_bright = false;

// Draws color on the Grid
function color(clr, random, shade, bright) {
    allDivs = grid.querySelectorAll('div');
    allDivs.forEach((divs) => {
        divs.addEventListener('click', () => {
            if (random) {
                divs.style.background = colors[Math.floor(Math.random()*colors.length)];
            } else if (shade) {
                if (divs.style.filter) {
                    style = getComputedStyle(divs);
                    num_style = Number(style.filter.replace(/[^0-9\.]+/g,""))
                    divs.style.filter = "brightness(" + (num_style - 0.1) + ")";

                    console.log(divs.style.filter)
                } else {
                    divs.style.filter = "brightness(0.9)";
                }
            } else if (bright) {
                if (divs.style.filter) {
                    style = getComputedStyle(divs);
                    num_style = Number(style.filter.replace(/[^0-9\.]+/g,""))
                    divs.style.filter = "brightness(" + (num_style + 0.1) + ")";

                    console.log(divs.style.filter)
                } else {
                    divs.style.filter = "brightness(1.1)";
                }   
            }   else {
                divs.style.background = clr;
            }
            return
        });

        divs.addEventListener('mouseover', () => {
            if (leftMouseButtonOnlyDown) {
                if (random) {
                    divs.style.background = colors[Math.floor(Math.random()*colors.length)];
                } else if (shade) {
                    if (divs.style.filter) {
                        style = getComputedStyle(divs);
                        num_style = Number(style.filter.replace(/[^0-9\.]+/g,""))
                        divs.style.filter = "brightness(" + (num_style - 0.1) + ")";
                    } else {
                        divs.style.filter = "brightness(0.9)";
                    }
                } else if (bright) {
                    if (divs.style.filter) {
                        style = getComputedStyle(divs);
                        num_style = Number(style.filter.replace(/[^0-9\.]+/g,""))
                        divs.style.filter = "brightness(" + (num_style + 0.1) + ")";
                    } else {
                        divs.style.filter = "brightness(1.1)";
                    }   
                }   else {
                    divs.style.background = clr;
                }
            }
        });
        
    });
};


// Erases on the Grid
const eraser = document.querySelector("#eraser");
eraser.addEventListener('mouseover', () => {
    color(back_color, is_random, is_shade, is_bright);
});

// Clears the Grid
const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    allDivs = grid.querySelectorAll('div');
    allDivs.forEach((divs) => {
        divs.style.background = back_color;
        divs.style.filter = "";
    });
    color(pen_color, is_random, is_shade, is_bright);
});

// Changes Pen Color
const pen = document.querySelector("#pen");
pen.addEventListener("change", () => {
    pen_color = pen.value;
    is_random = false;
    is_shade = false;
    is_bright = false;
    color(pen_color, is_random, is_shade, is_bright);
});

// Random Pen Colors
const rainbow = document.querySelector("#random");
rainbow.addEventListener("click", () => {
    is_random = true;
    is_shade = false;
    is_bright = false;
    color(pen_color, is_random, is_shade, is_bright);
});

// Shade the colors
const shade = document.querySelector("#shade");
shade.addEventListener("click", () => {
    is_shade = true;
    is_random = false;
    is_bright = false;
    color(pen_color, is_random, is_shade, is_bright);
});

// Brighten the colors
const bright = document.querySelector("#bright");
bright.addEventListener("click", () => {
    is_shade = false;
    is_random = false;
    is_bright = true;
    color(pen_color, is_random, is_shade, is_bright);
});

// Select Pen
const pen_sel = document.querySelector("#pen_use");
pen_sel.addEventListener("click", () => {
    is_random = false;
    is_shade = false;
    is_bright = false;
    color(pen_color, is_random, is_shade, is_bright);
});

// Changes Background Color
const back = document.querySelector("#back");
back.addEventListener("change", () => {
    allDivs = grid.querySelectorAll('div');
    allDivs.forEach((divs) => {
        if (!divs.style.background || equal_color(divs.style.background, back_color)) {
            divs.style.background = back.value;
            divs.style.filter = "";
        } 
    });
    color(pen_color, is_random, is_shade, is_bright);
    back_color = back.value;
});

// Changes Grid Size
const grid_size = document.querySelector("#slider");
grid_size.addEventListener("change", () => {
    const txt = document.getElementById("slider_label")
    grid_num = grid_size.value
    txt.innerHTML = "Grid Size: " + grid_num;

    const grids = document.getElementById("grids");
    grids.innerHTML = '';
    grids.style.gridTemplateColumns = "repeat(" + grid_num + ", 1fr)";
    grider(grid_num);

    grid = document.querySelector("#grids");
});