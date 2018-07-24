

const input = document.getElementById('line-input');
const formula = [];

input.onmousedown = startCollectItems ;


function startCollectItems(e) {
    const inputField = document.getElementById('inputField');
    document.onkeypress = function (event) {
        if(event.key){
            if(formula.length > 7){
                return false;
            }
            formula.push(event.key);
            inputField.textContent += event.key;
            console.log(formula.length);
        }
    };
}


