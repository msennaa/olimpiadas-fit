export default class Name {
    private value: string;

    constructor(name: string) {
        if (name.length < 3) throw new Error('Name must have at least 3 characters');
        if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error('Invalid name');
        this.value = name;
    }

    getValue() {
        return this.value;
    }
}
