import crypto from 'crypto';
import Cpf from '../vo/Cpf';
import Name from '../vo/Name';
import Age from '../vo/Age';
import { Uuid } from '../../../shared/domain/vo/Uuid';

export default class Athlete {
    private cpf: Cpf;
    private name: Name;
    private age: Age;
    private id: Uuid;

    constructor(id: string, name: string, cpf: string, age: number) {
        this.id = new Uuid(id);
        this.cpf = new Cpf(cpf);
        this.name = new Name(name);
        this.age = new Age(age);
    }

    static create(name: string, cpf: string, age: number): Athlete {
        const athleteId = new Uuid();
        return new Athlete(athleteId.getValue(), name, cpf, age);
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

    getId() {
        return this.id.getValue();
    }
}
