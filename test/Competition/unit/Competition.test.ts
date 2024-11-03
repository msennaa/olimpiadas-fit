import Competition from '../../../src/Competition/domain/entity/Competition'

test('Should create an competition successfully', function () {
    const competition = Competition.create('any_competition', 'any_competition_type_id');
    expect(competition.id).toBeDefined();
    expect(competition.getName()).toBe('any_competition');
    expect(competition.getStatus()).toBe('in-progress');
    expect(competition.startCompetition).toBeDefined();
    expect(competition.endCompetition).toBeNull();
})

test('Should finish an competition successfully', function () {
    const competition = Competition.create('any_competition', 'any_competition_type_id');
    competition.finishCompetition();
    expect(competition.getStatus()).toBe('finished');
    expect(competition.endCompetition).toBeDefined();
})

test('Should not finish an competition thats not in progress', function () {
    const competition = new Competition('any_id', 'any_competition', 'finished', 'any_competition_type_id', new Date(), null);
    expect(() => competition.finishCompetition()).toThrow(new Error('Competition is not in progress'))
})
