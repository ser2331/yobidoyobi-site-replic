import * as Yup from 'yup';

export const validationSchema = {
    phone: Yup.string().test('phoneMask', 'error', (value) => value && !value.match(/_/)),
};
