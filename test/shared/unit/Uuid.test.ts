import { Uuid } from '../../../src/shared/domain/vo/Uuid';

test.each([
    '374559ee-e8db-431b-9420-73144908bd30',
    '60641756-671f-492e-b2d1-ed0cabcce2dd',
    '3759e76e-3c0e-44bd-aeee-f4b279dd106d'
])("Should test if uuid is valid %s", function (uuid: string) {
    expect(new Uuid(uuid)).toBeDefined();
});

test.each([
    "123456",
    "asdioj-54651-54asdas-as54d85s",
    "11111111111"
])("Should test if uuid is invalid %s", function (uuid: any) {
    expect(() => new Uuid(uuid)).toThrow('ID must be a valid UUID')
});
