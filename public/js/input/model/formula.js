




class EventEmitter{
    constructor(){
        this.events = {};

    }
    on(type, callback){
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }
    emit(type, arg){
        if(this.events[type]){
            this.events[type].forEach((callback => callback(arg)));
        }
    }
}

class Formula extends EventEmitter{
    constructor(validator) {
        super();
        this.data = [];
        this.maxlength = 18;
        this.id = Date.now();
        this.stateData = false;
        this.isPower = false;
        if (validator instanceof Validator) {
            this.validator = validator;
        }
    }

    getStateData(){
        return this.stateData;
    }

    getId(){
        return this.id;
    }

    validateItem(item) {
        this.stateData = this.validator.validate(item);
    }

    addItem(item) {

        if(this.data.length > this.maxlength){
            return false;   //проверяем чтобы не было переполнение массива
        }
        this.validateItem(item); //проверяем введенные данные и если они true добавляем в массив

        if(this.stateData){
            this.data.push(item);
            return this.generateWrapForItem(item); //генерируем узел для HTML и возвращаем в контроллер
        }
        else return false;
    }

    generateWrapForItem(item){
        const letters = /[a-z]/;
        const digit = /[0-9]/;
        const signMultiply =  /\*/;
        const signPower = /\^/;
        let node = null;
        if(this.isPower && digit.test(item)){
            this.isPower = false;
            node = document.createElement('sup');
            node.textContent = item;
        }
        else if(letters.test(item) ){
            node = document.createElement('var');
            node.textContent = item + ' ';

        }
        else if(signMultiply.test(item)){
            node = document.createElement('sup');
            node.textContent = item + ' ';

        }
        else if(signPower.test(item)){
            this.isPower = true;
        }
        else{
            node = document.createElement('span');
            node.textContent = item + ' ';

        }
        if(node){
            node.setAttribute('data-index', this.data.length-1);
        }
        return node;
    }

    deleteItem(node) {
        if(this.data.length > 0){
            let nodeIndex = parseInt(node.getAttribute('data-index'));

            this.data.splice(nodeIndex,1);
        }

    }


    deleteFormula() {
        this.data = [];
    }

}

class Validator{
    constructor(){
        this.validCharacters = /[a-z0-9\-\(\)\.\/\^\+\=\|\*]/;
    }

    validate(item){
        if(typeof(item) !== "string"){
            item += '';
        }
        return this.validCharacters.test(item);
    }
}

class FormulaViewInput extends EventEmitter{
    constructor(){
        super();
        this.caret = new Caret();
        this.input = document.getElementById('line-input');
        this.inputField = this.input.querySelector('.inputField');
        document.addEventListener('click', this.handleToggle.bind(this));
        document.addEventListener('keypress', this.handleAddItem.bind(this));
        document.addEventListener('keydown', this.handleDeleteItem.bind(this));
    }
    handleToggle(event){
        this.emit('toggle', event);
    }

    toggleInput(event){
        if(event.target.id === 'line-input'){
            this.input.classList.add('activeField');
            this.inputField.appendChild(this.caret.value);
        }
        else if(this.input.classList.contains ( 'activeField' )){
            this.input.classList.remove('activeField');
            this.inputField.removeChild(this.caret.value);
        }
    }

    handleAddItem(event){
        if(event){
            let item = event.key;
            this.emit('keypress', item);
        }
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


    addItem(node){
        if(node){
            const activeField = document.querySelector('.activeField');
            const input = activeField.querySelector('.inputField');
            const caret = input.querySelector('strong');

            input.insertBefore(node, caret);
        }
    }

    deleteItem(node){
        const activeField = document.querySelector('.activeField');
        const input = activeField.querySelector('.inputField');

        input.removeChild(node);
    }

    moveCarete(){

    }

    addInput(){

    }

    deleteInput(){

    }
}


class FormulaViewValidatorData extends EventEmitter{
    constructor(){
        super();
        this.model = formula; //передаем id поля куда вставить картинку и состояние данных true или false;
        this.id = this.model.getId();
        this.stateData = this.model.getStateData();
        this.valid = '<img src="../../../img/func40x40.png">';
        this.notValid = '<img src="../../../img/WarningTriangle40x40.png">';
    }

    addValidateImg(){
        const input = document.getElementById(this.id);
        const field = input.querySelector('.notification-img');
        if(this.stateData === true){
            field.innerHTML = this.valid;
        }
        else{
            field.innerHTML = this.notValid;
        }
    }
}

class FormulaController{
    constructor(formula, formulaViewInput, formulaViewValidatorData) {
        this.formula = formula;
        this.formulaViewInput = formulaViewInput;
        //this.formulaViewValidatorData = formulaViewValidatorData;

        formulaViewInput.on('toggle', this.toggleInput.bind(this));
        //formulaViewInput.on('edit', this.activeInput.bind(this));
        formulaViewInput.on('keydown', this.deleteItem.bind(this));
        formulaViewInput.on('keypress', this.addItem.bind(this));
        //formulaViewInput.show(formula.state);
    }

        addItem(item){

            const node = this.formula.addItem(item);
            if(node){
                this.formulaViewInput.addItem(node);
            }
        }
        toggleInput(element){
            this.formulaViewInput.toggleInput(element);
        }
         deleteItem(node){
            this.formula.deleteItem(node);
            this.formulaViewInput.deleteItem(node);
        }
    }

class Caret{
    constructor() {
        let self = this;
        this.value = document.createElement('strong');
        this.value.id = 'caret';
        function flash() {

            if (self.value.textContent) {
                self.value.textContent = '';
            }
            else{
                self.value.textContent = '|';
            }

            if (self.timer) {
                clearTimeout(self.timer);
            }
            self.timer = setTimeout(flash, 500);
        }

        this.timer = setTimeout(flash, 500);
    }
}



const formula = new Formula(new Validator());


const input = new FormulaViewInput();

const controller = new FormulaController(formula, input);


