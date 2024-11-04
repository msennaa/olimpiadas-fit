import { AttemptFactory } from '../../../src/Competition/domain/factory/Attempts/AttemptHandler';
import { DartAttempt } from '../../../src/Competition/domain/factory/Attempts/DartAttempt';
import { HydrationAttempt } from '../../../src/Competition/domain/factory/Attempts/HydrationAttempt';
import { LoseWeightAttempt } from '../../../src/Competition/domain/factory/Attempts/LoseWeightAttempt';
import { MeditationAttempt } from '../../../src/Competition/domain/factory/Attempts/MeditationAttempt';
import { CompetitionType } from '../../../src/Competition/domain/vo/CompetitionType';

describe('AttemptFactory', function () {
    test('should create a HydrationAttempt', function () {
        const attempt = AttemptFactory.create(CompetitionType.Hydration, 'athlete1', 'competition1', 'l', 2);
        expect(attempt).toBeInstanceOf(HydrationAttempt);
        expect(attempt.getCreatedAt()).toBeDefined();
        expect(attempt.getDeletedAt()).toBeNull();
        expect(attempt.getId()).toBeDefined();
        expect(attempt.getUnit()).toBe('l');
        expect(attempt.getValue()).toBe(2);
    });

    test('should not create a HydrationAttempt with invalid unit', function () {
        expect(() => AttemptFactory.create(CompetitionType.Hydration, 'athlete1', 'competition1', 'kg', 2))
            .toThrow(new Error('Invalid unit'));
    });

    test('should not create a HydrationAttempt with invalid value', function () {
        expect(() => AttemptFactory.create(CompetitionType.Hydration, 'athlete1', 'competition1', 'ml', -2))
            .toThrow(new Error('Invalid value'));
    });

    test('should create a MeditationAttempt', function () {
        const attempt = AttemptFactory.create(CompetitionType.Meditation, 'athlete1', 'competition1', 'm', 30);
        expect(attempt).toBeInstanceOf(MeditationAttempt);
    });

    test('should not create a MeditationAttempt with invalid unit', function () {
        expect(() => AttemptFactory.create(CompetitionType.Meditation, 'athlete1', 'competition1', 'l', 2))
            .toThrow(new Error('Invalid unit'));
    });

    test('should not create a MeditationAttempt with invalid value', function () {
        expect(() => AttemptFactory.create(CompetitionType.Meditation, 'athlete1', 'competition1', 'm', -2))
            .toThrow(new Error('Invalid value'));
    });

    test('should create a LoseWeightAttempt', function () {
        const attempt = AttemptFactory.create(CompetitionType.LoseWeight, 'athlete1', 'competition1', 'kg', 1);
        expect(attempt).toBeInstanceOf(LoseWeightAttempt);
    });

    test('should not create a LoseWeightAttempt with invalid unit', function () {
        expect(() => AttemptFactory.create(CompetitionType.LoseWeight, 'athlete1', 'competition1', 'ml', 2))
            .toThrow(new Error('Invalid unit'));
    });

    test('should not create a LoseWeightAttempt with invalid value', function () {
        expect(() => AttemptFactory.create(CompetitionType.LoseWeight, 'athlete1', 'competition1', 'kg', -50))
            .toThrow(new Error('Invalid value'));
    });

    test('should create a DartAttempt', function () {
        const attempt = AttemptFactory.create(CompetitionType.Dart, 'athlete1', 'competition1', 'm', 50);
        expect(attempt).toBeInstanceOf(DartAttempt);
    });

    test('should not create a MeditationAttempt with invalid unit', function () {
        expect(() => AttemptFactory.create(CompetitionType.Dart, 'athlete1', 'competition1', 'ml', 2))
            .toThrow(new Error('Invalid unit'));
    });

    test('should not create a MeditationAttempt with invalid value', function () {
        expect(() => AttemptFactory.create(CompetitionType.Dart, 'athlete1', 'competition1', 'm', -100))
            .toThrow(new Error('Invalid value'));
    });

    test('should throw an error for an invalid competition type', function () {
        expect(() => {
            AttemptFactory.create('invalidType', 'athlete1', 'competition1', 'unit', 1);
        }).toThrow(new Error('Invalid competition type'));
    })
});
