import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const LogInBtn: React.FC = () => {
    return (
        <NavLink to={"/login"}>
            <Button
                variant="contained"
            >
                LogIn
            </Button>
        </NavLink>
    )
}

export default LogInBtn;