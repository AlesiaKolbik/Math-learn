import {EventEmitter} from "../helpers.js";

export class KeypadView extends EventEmitter{
    constructor(){
        super();
        this.keypad = document.getElementById('calculator');
        this.keypad.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event){
        if(event.target && event.target.hasAttribute('data-key-value') || event.target.parentNode.hasAttribute('data-key-value')){
            const keyValue = event.target.getAttribute('data-key-value') || event.target.parentNode.getAttribute('data-key-value');
            this.emit('click', keyValue );
        }
    }
}