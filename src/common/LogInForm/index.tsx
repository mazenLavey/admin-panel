import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { logInFormSchema } from 'schema/form';
import TextField from '@mui/material/TextField';
import { UserLogin } from 'types/interfaces';
import Button from '@mui/material/Button';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './index.css';
import { toastNotifications } from 'common/Toastify/index';


const LogInForm: React.FC = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting } = useFormik<UserLogin>({
        initialValues: {
            userEmail: '',
            userPassword: '',
        },
        validationSchema: logInFormSchema,
        onSubmit: async (data, action) => {
            try {
                action.setSubmitting(true)
                await signIn(data.userEmail, data.userPassword);
                navigate('/admin');
                action.resetForm();
                toastNotifications.success();
                action.setSubmitting(false)
            } catch (error: any) {
                toastNotifications.error(error.message);
                action.setSubmitting(false)
            }
        },
    })


    return (
        <>
            <form className='Login__form' onSubmit={handleSubmit}>
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
                    LogIn
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

export default LogInForm;