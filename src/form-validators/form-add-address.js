import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    nameAddress: Yup.string().typeError('string'),
    title: Yup.string().typeError('string'),
    street: Yup.string().typeError('string'),
    floor: Yup.number().typeError('number'),
    intercom: Yup.number().typeError('number'),
    entrance: Yup.number().typeError('number'),
    apartment: Yup.number().typeError('number'),
});
