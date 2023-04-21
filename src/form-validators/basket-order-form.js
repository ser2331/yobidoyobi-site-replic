import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    checkbox: Yup.array().required('*'),
    name: Yup.string().max(50, 'Длина имени не должна превышать 50 символов').required('Необходимо заполнить'),
    phoneNumber: Yup.string().test('phoneMask', 'error', (value) => value && !value.match(/_/)),
    code: Yup.number().typeError('number').required('*'),
    timeDelivery: Yup.number().typeError('number').required('*'),
    change: Yup.number().typeError('number'),
    address: Yup.string().typeError('string').required('*'),
    methodDelivery: Yup.string().required('*'),
    persons: Yup.number().typeError('number').required('*'),
    comment: Yup.string().typeError('string').required('*'),
});
