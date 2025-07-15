console.log("Hello World");

const DRAWING_SIZE = 480;
const DRAWING_AREA = document.querySelector("#drawing");
let drawingDivs;

const colorPicker = document.querySelector("#colorPick");
const quickColorPicker = document.querySelectorAll("li");
const randomColor = document.querySelector("#randomColor");

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
let rVal, gVal, bVal, oVal, randomCheck;
randomCheck = false;

divCreate();
readyDrawing();

function readyDrawing() {
    drawingDivs = document.querySelectorAll(".draw");
    drawingDivs.forEach(div => {
        div.addEventListener("mouseenter", () => {
            if (colorVal !== undefined) {
                if (randomCheck == false) {
                    div.style.backgroundColor = colorVal;
                    div.style.opacity = 0.5;
                    div.style.borderColor = "rgba(211, 211, 211, 0.3)";
                } else {
                    colorVal = generateColor();
                    div.style.backgroundColor = colorVal;
                    div.style.opacity = 0.5;
                    div.style.borderColor = "rgba(211, 211, 211, 0.3)";
                }
            } else {
                //div.style.backgroundColor = colorVal;
                div.style.opacity = 0.1;      
            }
        });
        div.addEventListener("mouseleave", () => {
            div.style.opacity = 1;
        });
    });
};


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

function generateColor() {
    rVal = Math.floor(Math.random() * 256);
    gVal = Math.floor(Math.random() * 256);
    bVal = Math.floor(Math.random() * 256);
    oVal = Math.floor(Math.random()*10 + 1 ) / 10;
    return `rgba(${rVal}, ${gVal}, ${bVal}, ${oVal})`;
};

rangeBar.addEventListener("change", () => {
    gridText.textContent = `${rangeBar.value} x ${rangeBar.value} Grid`;
    setGridBtn.style.fontWeight = "bold"
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
    setGridBtn.style.fontWeight = "normal"
    readyDrawing();
});

clearBtn.addEventListener("click",() => {
    divRemove();
    divCreate();
    colorVal = undefined;
    quickColorPicker.forEach(picker => {
        picker.style.outline = "none";
    });
    colorPicker.style.outline = "none";
    randomColor.style.outline = "none";
    randomCheck = false;
    readyDrawing();
    message.textContent = "Drawing area cleared, pick a color!";
});

colorPicker.addEventListener("change", () => {
    colorPicker.style.outline = "2px solid black";
    colorVal = colorPicker.value;
    message.textContent = `Your color set to ${colorVal}`;
    quickColorPicker.forEach(picker => {
        picker.style.outline = "none";
    });
    randomColor.style.outline = "none";
    randomCheck = false;
});

quickColorPicker.forEach(picker => {
   picker.addEventListener("click", () => {
        quickColorPicker.forEach(picker => {
            picker.style.outline = "none";
        });
        colorVal = getComputedStyle(picker).backgroundColor;
        picker.style.outline = "2px solid black";
        colorPicker.style.outline = "none";
        randomColor.style.outline = "none";
        randomCheck = false;  
        message.textContent = `Your color set to ${picker.id}`;
   });
});

randomColor.addEventListener("click", () => {
    randomColor.style.outline = "2px solid black";
    quickColorPicker.forEach(picker => {
        picker.style.outline = "none";
    });
    colorPicker.style.outline = "none";
    randomCheck = true;
    colorVal = generateColor();
    message.textContent = `I don't know what color i set but let's see how it will end :)`
});