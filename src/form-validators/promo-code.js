import * as Yup from 'yup';

export const validationSchema = {
    code: Yup.string().min(4, 'Неверный промокод').required('Введите промокод'),
};
