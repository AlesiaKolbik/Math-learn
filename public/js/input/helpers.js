
function find(array, value) {

    for (let i = 0; i < array.length; i++) {
        if (array[i].indexOf(value)) return true;
    }

    return false;
}




