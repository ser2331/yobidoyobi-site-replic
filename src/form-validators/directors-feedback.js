import * as Yup from 'yup';

export const validationSchema = {
    phone: Yup.string().test('phoneMask', 'error', (value) => value && !value.match(/_/)),
    name: Yup.string().min(2, 'error').required('error'),
    description: Yup.string().min(2, 'error').required('error'),
};
