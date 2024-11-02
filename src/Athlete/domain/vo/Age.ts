export default class Age {
    private value: number;

    constructor(age: number) {
        this.validateAge(age);
        this.value = age;
    }

    validateAge(age: number) {
        if (typeof age !== 'number' || isNaN(age)) throw new Error('Age must be a number');
        if (this.isMinor(age)) throw new Error('Minor cant compete');
        if (this.isElderly(age)) throw new Error('Elderly cant compete');
        return true;
    }

    getValue() {
        return this.value;
    }

    setValue(age: number) {
        this.value = new Age(age).getValue();
    }

    isMinor(age: number) {
        return age < 18;
    }

    isElderly(age: number) {
        return age > 100;
    }
}
