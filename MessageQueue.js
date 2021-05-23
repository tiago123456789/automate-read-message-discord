module.exports = class MessageQueue {

    constructor() {
        this._itens = [];
        this._itemTopList = 0;
    }

    isEmpty() {
        return (this._itens.length  - 1) == this._itemTopList;
    }

    add(value) {
        this._itens.push(value);
    }

    getItemInTop() {
        const item = this._itens[this._itemTopList];
        if (item) {
            delete this._itens[this._itemTopList];
            this._itemTopList++;
        }
        
        return item || null;
    }

    toString() {
        this._itens.forEach(console.log);
    }
}
