import Status from '../../../src/Competition/domain/vo/Status';

test.each([
    'in-progress',
    'finished',
])("Should test if status is invalid %s", function (status: string) {
    expect(new Status(status)).toBeDefined();
});

test.each([
    "",
    null,
    undefined,
    "any_status",
    "12345678901234567890",
    "11111111111"
])("Should test if status is invalid %s", function (status: any) {
    expect(() => new Status(status)).toThrow(new Error('Invalid status'))
});
