export class FormulaController {
    constructor(formula, formulaViewInput,keypadView) {
        this.formula = formula;
        this.formulaViewInput = formulaViewInput;
        this.keypad = keypadView;
        //this.formulaViewValidatorData = formulaViewValidatorData;

        formulaViewInput.on('toggle', this.toggleInput.bind(this));
        //formulaViewInput.on('edit', this.activeInput.bind(this));
        formulaViewInput.on('keydown', this.deleteItem.bind(this));
        formulaViewInput.on('keypress', this.addItem.bind(this));
        formulaViewInput.on('click', this.addNewInput.bind(this));
        formulaViewInput.on('delete', this.deleteInput.bind(this));
        //formulaViewInput.show(formula.state);
        keypadView.on('click', this.addItem.bind(this));
    }
    addNewInput(){
        if(this.formula.data.length === 5)return false;
        let idInput = Date.now();
        let newData ={};
        newData[idInput] = [];
        this.formula.addNewInput(newData);
        this.formulaViewInput.addNewInput(idInput);
    }
    deleteInput(id){
        if(id === 'line-input'){
            return false;
        }
        this.formula.deleteInput(id);
        this.formulaViewInput.deleteInput(id);
    }

    addItem(item) {
        if(/\$/.test(item)){
            switch (item){
                case '$backspace':{
                    this.formulaViewInput.handleDeleteItem({which:8});
                    break;
                }
                case '$enter':{
                    this.addNewInput();
                    break;
                }
                case '$^2':{
                    this.formulaViewInput.handleAddItem({key:'^'});
                    this.formulaViewInput.handleAddItem({key:'2'});
                    break;
                }
                case '$|a|':{
                    break;
                }
                case 'left':{
                    break;
                }
                case '$right':{
                    break;
                }
            }
        }
        else{
            const node = this.formula.addItem(item);
            console.log(this.formula.data);
            if (node) {
                this.formulaViewInput.addItem(node);
            }
        }

    }

    toggleInput(element) {
        this.formulaViewInput.toggleInput(element);
    }

    deleteItem(node) {
        this.formula.deleteItem(node);
        this.formulaViewInput.deleteItem(node);
    }
}