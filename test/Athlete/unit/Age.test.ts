import Age from '../../../src/Athlete/domain/vo/Age';

test.each([
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27
])('Should create an valid age with value %s', function (age: number) {
    expect(() => new Age(age)).toBeDefined();
})

test.each([
    17,
    2,
    1,
    -6,
])('Should not create an valid age with value %s', function (age: number) {
    expect(() => new Age(age)).toThrow(new Error('Minor cant compete'));
})

test.each([
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110
])('Should not create an valid age with value %s', function (age: number) {
    expect(() => new Age(age)).toThrow(new Error('Elderly cant compete'));
})

test('should set a new value to age', function () {
    const age = new Age(18);
    age.setValue(19);
    expect(age.getValue()).toBe(19);
})
