// Global Variables
const grid = document.querySelector("#grids");
let leftMouseButtonOnlyDown = false;
let back_color = "#FFFFFF";
let pen_color = "#000000";

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
for (i = 0; i < 20 * 20; i++) {
    const div = document.createElement('div');
    grid.appendChild(div);
};

// Draws color on the Grid
const allDivs = grid.querySelectorAll('div');
function color(clr) {
    allDivs.forEach((divs) => {
        divs.addEventListener('mouseover', () => {
            if (leftMouseButtonOnlyDown) {
                divs.style.background = clr;
            }
        });
    });
};

color(pen_color);

// Erases on the Grid
const eraser = document.querySelector("#eraser");
eraser.addEventListener('mouseover', () => {
    color(back_color);
});

// Clears the Grid
const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    allDivs.forEach((divs) => {
        divs.style.background = back_color;
    });
});

// Changes Pen Color
const pen = document.querySelector("#pen");
pen.addEventListener("change", () => {
    pen_color = pen.value;
    color(pen_color);
});

// Select Pen
const pen_sel = document.querySelector("#pen_use");
pen_sel.addEventListener("click", () => {
    color(pen_color);
})

// Checks if Two Colors Are the same (Hex and RGBA are Different Formats)
function equal_color(rgb_clr, color2) {
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")";
    }
    return hexToRgb(color2) == rgb_clr
};

// Changes Background Color
const back = document.querySelector("#back");
back.addEventListener("change", () => {
    allDivs.forEach((divs) => {
        if (!divs.style.background || equal_color(divs.style.background, back_color)) {
            divs.style.background = back.value;
        } 
    });
    back_color = back.value;
    color(pen_color);
});

// Add or Remove Grid Lines
const grid_line = document.querySelector("#grid_line");
grid_line.addEventListener("click", () => {
    allDivs.forEach((divs) => {
        console.log();
    });
});