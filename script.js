// Global Variables
let grid = document.querySelector("#grids");
let leftMouseButtonOnlyDown = false;
let back_color = "#FFFFFF";
let pen_color = "#000000";
let grid_num = 50;

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

// Needed to add this because when grid size is changed, the div variables are also changed
function rerun() {
    // Draws color on the Grid
    let allDivs = grid.querySelectorAll('div');
    
    function color(clr) {
        allDivs = grid.querySelectorAll('div');
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
        allDivs = grid.querySelectorAll('div');
        allDivs.forEach((divs) => {
            divs.style.background = back_color;
        });
        color(pen_color);
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

    // Changes Background Color
    const back = document.querySelector("#back");
    back.addEventListener("change", () => {
        allDivs = grid.querySelectorAll('div');
        allDivs.forEach((divs) => {
            console.log(divs.style.background);
            console.log(back_color);
            if (!divs.style.background || equal_color(divs.style.background, back_color)) {
                divs.style.background = back.value;
            } 
        });
        back_color = back.value;
        color(pen_color);
    });
    color(pen_color);
}

rerun();

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
    rerun();
});