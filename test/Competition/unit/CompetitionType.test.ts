import CompetitionType from '../../../src/Competition/domain/entity/CompetitionType'

test.each([
    'hydration',
    'Lose weight',
    'meditation',
    'dart'
])('Should create a competition type %s successfully', function (competitionType: string) {
    expect(CompetitionType.create(competitionType)).toBeDefined();
})

test.each([
    'hydr4t1on',
    'L0s3 w3ight',
    'm3d1t4t10n',
    'd4rt'
])('Should not create a competition type %s', function (competitionType: string) {
    expect(() => CompetitionType.create(competitionType)).toThrow(new Error('Invalid name'));
})

test.each(['a', 'aa'])('Should not create a competition type with empty name or less than 3 characters', function (competitionType: string) {
    expect(() => CompetitionType.create(competitionType)).toThrow(new Error('Name must have at least 3 characters'));
})
