import Competition from '../../../src/Competition/domain/entity/Competition'

test('Create an competition successfully', function () {
    const competition = Competition.create('any_competition', 'any_competition_type_id');
    expect(competition.id).toBeDefined();
    expect(competition.name).toBe('any_competition');
    expect(competition.status).toBe('in-progress');
    expect(competition.startCompetition).toBeDefined();
    expect(competition.endCompetition).toBeNull();
})
