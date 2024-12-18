import Name from '../../../src/Competition/domain/vo/Name';

test.each([
    'Any Name',
    'Another Name',
    'Valid Name'
])('Should test if name %s is valid', function (name) {
    expect(new Name(name)).toBeDefined();
})

test.each([
    'name_with_special_characters_!@#$%¨&*()_+',
    '12345678901234567890',
    '11111111111'
])('Should test if name %s is invalid', function (name) {
    expect(() => new Name(name)).toThrow('Invalid name')
});

test('Should test if name is a string', function () {
    expect(() => new Name(null as any)).toThrow('Name must be a string')
});
