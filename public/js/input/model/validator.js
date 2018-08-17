export class Validator{
    constructor(){
        this.validCharacters = /[a-z0-9\-\(\)\.\/\^\+\=\|\*]/;
        this.validItem = false;
    }

    validate(item){
        if(typeof(item) !== "string"){
            item += '';
        }
        this.validItem = this.validCharacters.test(item);
    }
}