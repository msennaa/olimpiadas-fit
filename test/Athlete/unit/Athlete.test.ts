import Athlete from '../../../src/Athlete/domain/entity/Athlete';
import { Uuid } from '../../../src/shared/domain/vo/Uuid';

test('Should create a valid athlete', function () {
    const validId = new Uuid();
    const athlete = new Athlete(validId.getValue(), 'Any Name', '97456321558', 18);
    expect(athlete.getId()).toBeDefined();
});

test('Should not create a valid athlete', function () {
    const validId = new Uuid();
    expect(() => new Athlete(validId.getValue(), 'Any Name', '000000', 18)).toThrow(new Error('Invalid cpf'));
});
