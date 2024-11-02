import crypto from 'crypto';
import Cpf from '../vo/Cpf';
import Name from '../vo/Name';
import Age from '../vo/Age';

export default class Athlete {
    private cpf: Cpf;
    private name: Name;
    private age: Age;

    constructor(readonly id: string, name: string, cpf: string, age: number) {
        this.cpf = new Cpf(cpf);
        this.name = new Name(name);
        this.age = new Age(age);
    }

    static create(name: string, cpf: string, age: number): Athlete {
        const athleteId = crypto.randomUUID();
        return new Athlete(athleteId, name, cpf, age);
    }

    getCpf() {
        return this.cpf.getValue();
    }

    getName() {
        return this.name.getValue();
    }

    getAge() {
        return this.age.getValue();
    }
}
