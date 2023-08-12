import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
    userName: yup.string().min(1, "Minimum one character").required("Required"),
    userEmail: yup.string().email("Email must be a valid email").required("Required"),
    userPassword: yup.string().min(1, "Minimum one character").required("Required"),
});

export const logInFormSchema = yup.object().shape({
    userEmail: yup.string().email("Email must be a valid email").required("Required"),
    userPassword: yup.string().min(1, "Minimum one character").required("Required"),
});
