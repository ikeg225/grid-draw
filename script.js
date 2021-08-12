const grid = document.querySelector("#grids");

for (i = 0; i < 150 * 150; i++) {
    const div = document.createElement('div');
    grid.appendChild(div);
};

const allDivs = grid.querySelectorAll('div');
function color(clr) {
    allDivs.forEach((divs) => {
        divs.addEventListener('mouseover', () => {
            divs.style.background = clr;
        });
    });
};

color("red");

const eraser = document.querySelector("#eraser");
eraser.addEventListener('click', () => {
    color("");
});

const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    allDivs.forEach((divs) => {
        divs.style.background = "";
    });
})