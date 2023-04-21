import * as Yup from 'yup';

export const validationSchema = {
    email: Yup.string()
        .email('Неверно указан адрес электронной почты')
        .required('Необходимо заполнить'),
};
