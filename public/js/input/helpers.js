
export function find(array, value) {

    for (let i = 0; i < array.length; i++) {
        if (array[i].id) return true;
        //if (array[i].id === value) return true
    }
    return false;
}

export class EventEmitter{
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




