console.log("Hello World");

const DRAWING_SIZE = 480;
const DRAWING_AREA = document.querySelector("#drawing");

const colorPicker = document.querySelector("#colorPick");
const quickColorPicker = document.querySelectorAll("ul li");

const setGridBtn = document.querySelector("#rangeSet button");
const rangeBar = document.querySelector("#rangeSet input");
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
    // message content 
});

clearBtn.addEventListener("click",() => {
    divRemove();
    divCreate();
});

colorPicker.addEventListener("change", () => {
    colorVal = colorPicker.value;
    // mark color picker
    // unmark all quick color pickers
});


quickColorPicker.forEach(picker => {
   picker.addEventListener("click", () => {
        // colorVal cannot be set, because i can't get backgroundcolor val
        colorVal = picker.style["background-color"];
        console.log(colorVal);
        // mark only selected quick color
        // unmark rest of the quick color and colorpicker
   });
});

//mouse hover actions