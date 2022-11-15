const squareX = document.querySelector('.square-x');
const squareY = document.querySelector('.square-y');

function createXLines() {
    for (let i=0; i<80; i++) {
        const newDiv = document.createElement('div');
        if (i % 2) {
            newDiv.classList.add('square-x-odd');
        } else {
            newDiv.classList.add('square-x-even');
        }
        squareX.appendChild(newDiv);
    }
}

function createYLines() {
    for (let i=0; i<30; i++) {
        const newDiv = document.createElement('div');
        if (i % 2) {
            newDiv.classList.add('square-y-odd');
        } else {
            newDiv.classList.add('square-y-even');
        }
        squareY.appendChild(newDiv);
    }
}

createXLines();
createYLines();