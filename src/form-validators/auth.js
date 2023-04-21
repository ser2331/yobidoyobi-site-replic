import * as Yup from 'yup';

const validationSchemaFirstStep = {
    phone: Yup.string().test('phoneMask', 'error', (value) => value && !value.match(/_/)),
};

const validationSchemaSecondStep = {
    code: Yup.string().test('phoneMask', 'error', (value) => value && !value.match(/_/)),
};

export {
    validationSchemaFirstStep,
    validationSchemaSecondStep,
};
