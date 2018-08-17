export class Caret{
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