import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
import { useFormik } from 'formik';
import { UsersContext } from 'context/UsersContext';
import { nanoid } from 'nanoid';
import { signUpFormSchema } from 'schema/form';
import { UserBasic } from 'types/interfaces';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toastNotifications } from 'common/Toastify/index';
import './index.css';


const SignUpForm: React.FC = () => {
    const { createUser } = useContext(AuthContext);
    const { addUser } = useContext(UsersContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting } = useFormik<UserBasic>({
        initialValues: {
            id: nanoid(),
            userName: '',
            userEmail: '',
            userPassword: '',
            userStatus: 'active',
        },
        validationSchema: signUpFormSchema,
        onSubmit: async (data, action) => {
            try {
                action.setSubmitting(true);
                await createUser(data.userEmail, data.userPassword);
                await addUser(data);
                navigate('/admin');
                action.resetForm();
                toastNotifications.success()
                action.setSubmitting(false);
            } catch (error: any) {
                toastNotifications.error(error.message)
                action.setSubmitting(false);
            }
        },
    })

    return (
        <>
            <form className='SignUp__form' onSubmit={handleSubmit}>
                <TextField
                    id="userName"
                    name='userName'
                    label="Name"
                    variant="filled"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userName && touched.userName ? true : false}
                    helperText={errors.userName && touched.userName ? errors.userName : ''}
                />
                <TextField
                    type='email'
                    id="userEmail"
                    name='userEmail'
                    label="Email"
                    variant="filled"
                    value={values.userEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userEmail && touched.userEmail ? true : false}
                    helperText={errors.userEmail && touched.userEmail ? errors.userEmail : ''}
                />
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="userPassword">Password</InputLabel>
                    <Input
                        id="userPassword"
                        name='userPassword'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.userPassword && touched.userPassword ? true : false}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    variant="contained"
                    type='submit'
                >
                    SignUp
                </Button>
            </form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isSubmitting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default SignUpForm;