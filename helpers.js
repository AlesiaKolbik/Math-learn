

const input = document.getElementById('line-input');
const formula = [];

document.onclick = startCollectItems ;
 let idElem = null;
 let elem = null;
function startCollectItems(e) {
    if(e.target.id !== idElem && elem){
        input.classList.remove('activeField');
        return;
    }
    elem = e.target;
    idElem = e.target.id;
    const inputField = document.getElementById('inputField');
    input.classList.add('activeField');
    document.onkeypress = function (event) {
        if(event.key){
            if(formula.length > 7){
                return false;
            }
            formula.push(event.key);
            let el = document.createElement('var');
            el.textContent = ' '+ event.key;
            inputField.appendChild(el);
        }
    };
    document.onkeydown = function (event) {
        if(event.which == 8 && formula.length != 0){
            formula.splice(formula.length-1, 1);
            inputField.removeChild(inputField.lastChild);
        }
    }

}




