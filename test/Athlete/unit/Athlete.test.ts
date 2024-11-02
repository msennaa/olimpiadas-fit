import Athlete from '../../../src/Athlete/domain/entity/Athlete';

test('Should create a valid athlete', function () {
    const athlete = new Athlete('any_id', 'Any Name', '97456321558', 18);
    expect(athlete.id).toBeDefined();
});

test('Should not create a valid athlete', function () {
    expect(() => new Athlete('any_id', 'Any Name', '000000', 18)).toThrow(new Error('Invalid cpf'));
});
