export default class Name {
    private value: string;

    constructor(name: string) {
        if (name === null || typeof name !== 'string') throw new Error('Name must be a string');
        if (name.length < 3) throw new Error('Name must have at least 3 characters');
        if (name.match(/[0-9!@#$%^&*(),.?":{}|<>]/)) throw new Error('Invalid name');
        this.value = name;
    }

    getValue() {
        return this.value;
    }
}
