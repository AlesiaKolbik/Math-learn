import {EventEmitter, find} from "../helpers.js";
import { Caret } from "./caret.js";

export class FormulaViewInput extends EventEmitter{
    constructor(){
        super();
        this.caret = new Caret();
        this.input = document.getElementById('line-input');
        this.btnAddNewInput = document.getElementById('btn-add-item');
        this.inputField = this.input.querySelector('.inputField');

        this.btnAddNewInput.addEventListener('click', this.handleAddNewInput.bind(this));

        document.addEventListener('click', this.handleToggle.bind(this));
        document.addEventListener('keypress', this.handleAddItem.bind(this));
        document.addEventListener('keydown', this.handleDeleteItem.bind(this));
        this.numberNextInput = 2;
    }
    handleToggle(event){
        this.emit('toggle', event);
    }

    toggleInput(event){
        if(event.target.id === 'line-input'){
            this.input.classList.add('activeField');
            this.inputField.appendChild(this.caret.value);
        }
        else if(this.input.classList.contains ( 'activeField' ) && !find(event.path, 'calculator')){
            this.input.classList.remove('activeField');
            this.inputField.removeChild(this.caret.value);
        }
    }
    handleDeleteInput(event){
        console.log(event.currentTarget.parentNode.id);
        let id = event.currentTarget.parentNode.id;
        this.emit('delete', id);
    }


    handleAddItem(event){
        if(event){
            let item = event.key;
            this.emit('keypress', item);
        }
    }
    handleAddNewInput(){
        this.emit('click');
    }

    handleDeleteItem(event){
        if(this.caret.value.previousElementSibling){ //проверяем есть ли что удалять
            let keyCode = event.which;
            let deletedNode = this.caret.value.previousElementSibling;

            if(keyCode == 8 ){
                this.emit('keydown', deletedNode);
            }
        }
        else return false;

    }
    addNewInput(idInput){
        let newNode = this.input.cloneNode(true);
        let btn = this.btnAddNewInput;
        newNode.id = idInput;
        this.input.parentNode.insertBefore(newNode, btn);
        let numberNewInput = newNode.querySelector('.data-number-input');
        let numberBtn = btn.querySelector('.data-number-input');
        let btnDeleteInput = newNode.querySelector('.btn-delete-input');
        btnDeleteInput.addEventListener('click', this.handleDeleteInput.bind(this));
        numberNewInput.innerHTML =  this.numberNextInput;
        numberBtn.innerHTML =  this.numberNextInput +1;
        this.numberNextInput ++;
    }
    deleteInput(id){
        let node = document.getElementById(id);
        node.parentNode.removeChild(node);
        this.numberNextInput -=1;

    }


    addItem(node){
        if(node){
            const activeField = document.querySelector('.activeField');
            const input = activeField.querySelector('.inputField');
            const caret = input.querySelector('strong');
            const digit = /[0-9]/;

            if(caret.previousElementSibling && digit.test(caret.previousElementSibling.textContent)){
                let text = caret.previousElementSibling.textContent.trim();
                text+= node.textContent;
                caret.previousElementSibling.textContent = text;
            }
            else{
                input.insertBefore(node, caret);
            }
        }
    }

    deleteItem(node){
        const activeField = document.querySelector('.activeField');
        const input = activeField.querySelector('.inputField');

        input.removeChild(node);
    }

    moveCarete(){

    }

}
