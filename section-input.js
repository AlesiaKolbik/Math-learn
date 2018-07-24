class Formula {
    constructor(validator) {
        this.data = [];
        this.stateData = false;
        if (validator instanceof Validator) {
            this.validator = validator;
        }
    }

    validateItem(item) {
        this.stateData = this.validator.validate(item);
    }

    addItem(item) {   //проверяем введенные данные и если они true добавляем в массив
        this.validateItem(item);
        if(this.stateData){
            this.data.push(item);
        }
    }

    deleteItem(item) {
        const index = this.findIndexItem(item);

        if(index > -1){
            this.data.splice(index,1);
        }
    }

    findIndexItem(item){  //возвращает индекс элемента
        return this.data.findIndex(index => item == this.data[index]);
    }

    deleteFormula() {
        this.data = [];
    }
}

class Validator{
    constructor(){

    }

    validate(item){

    }

}

class FormulaViewInput{
    constructor(formula){
        this.caret = new Caret();
        this.formula = formula;
    }

    addItem(){

    }
    deleteItem(){

    }

    addCaret(){

    }
    moveCarete(){

    }

    addInput(){

    }

    deleteInput(){

    }
}


class FormulaViewValidatorData{
    constructor(id, stateData){  //передаем id поля куда вставить картинку и состояние данных true или false;
        this.id = id;
        this.stateData = stateData;
        this.valid = '<img src="img/func40x40.png">';
        this.notValid = '<img src="img/WarningTriangle40x40.png">';
    }

    addValidateImg(id){
        const input = document.getElementById(id);
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
    constructor(formula, formulaViewInput, formulaViewValidatorData){
        this.formula = formula;
        this.formulaViewInput = formulaViewInput;
        this.formulaViewValidatorData = formulaViewValidatorData;
    }
}

class Caret{
    constructor() {
        this.value = '';
        let self = this;
        const field = document.getElementById('inputField'); //мигающий курсор вставляется в строку при клике по инпуту.
        function flash() {

            if (self.value) {
                self.value = '';
            }
            else{
                self.value = '<span>&#124;</span>';
            }

            if (self.timer) {
                clearTimeout(self.timer);
            }
            self.timer = setTimeout(flash, 500);
        }

    this.timer = setTimeout(flash, 500);
    }
}





