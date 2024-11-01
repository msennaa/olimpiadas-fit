import Status from '../../../src/Competition/domain/entity/Status';

test.each([
    'in-progress',
    'finished',
])("Deve testar se o status é válido %s", function (status: string) {
    expect(new Status(status)).toBeDefined();
});

test.each([
    "",
    null,
    undefined,
    "any_status",
    "12345678901234567890",
    "11111111111"
])("Deve testar se o status é inválido %s", function (status: any) {
    expect(() => new Status(status)).toThrow(new Error('Invalid status'))
});
