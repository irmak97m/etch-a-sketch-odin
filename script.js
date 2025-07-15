console.log("Hello World");

const DRAWING_SIZE = 480;
const DRAWING_AREA = document.querySelector("#drawing");

const colorPicker = document.querySelector("#colorPick");
const quickColorPicker = document.querySelectorAll("li");

const setGridBtn = document.querySelector("#rangeSet button");
const rangeBar = document.querySelector("#rangeSet input");
rangeBar.value = 30;
let gridText = document.querySelector("#rangeSet span");

const clearBtn = document.querySelector("#clearButton");
let message = document.querySelector("#message");

//initial grid values
let gridCount= 30;
let divSize = 16;
let divCount = 900;
let colorVal;

divCreate();

function divCreate() {
    for(i = 0; i < divCount; i++ ) {
        const div = document.createElement("div");
        div.classList.add("emptySquare");
        div.classList.add("draw");
        div.setAttribute("style", `height:${divSize}px; width:${divSize}px;`);
        DRAWING_AREA.appendChild(div);
    }
};

function divRemove() {
    document.querySelectorAll(".draw").forEach(div => div.remove());
};

rangeBar.addEventListener("change", () => {
    gridText.textContent = `${rangeBar.value} x ${rangeBar.value} Grid`;
    // setGridBtn animation
});

setGridBtn.addEventListener("click", () => {
    divRemove();
    gridCount = rangeBar.value;
    divSize = DRAWING_SIZE / gridCount;
    divCount = Math.pow(gridCount,2);
    divCreate();
    if (colorVal !== undefined) {
        message.textContent = `Grid size set to ${gridCount} x ${gridCount}`;
    } else {
        message.textContent = `Please pick a color to start`;
    }
});

clearBtn.addEventListener("click",() => {
    divRemove();
    divCreate();
    colorVal = undefined;
    quickColorPicker.forEach(picker => {
        picker.style.outline = "none";
    });
    colorPicker.style.outline = "none";
    message.textContent = "Drawing area cleared";
});

colorPicker.addEventListener("change", () => {
    colorPicker.style.outline = "2px solid black";
    colorVal = colorPicker.value;
    message.textContent = `Your color set to ${colorVal}`;
    quickColorPicker.forEach(picker => {
        picker.style.outline = "none";
    });
});

quickColorPicker.forEach(picker => {
   picker.addEventListener("click", () => {
        quickColorPicker.forEach(picker => {
            picker.style.outline = "none";
        });
        colorVal = getComputedStyle(picker).backgroundColor;
        picker.style.outline = "2px solid black";
        colorPicker.style.outline = "none";
        message.textContent = `Your color set to ${picker.id}`;
   });
});

//mouse hover actions