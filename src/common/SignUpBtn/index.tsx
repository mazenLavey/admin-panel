import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

type Props = {
    btnSize?: "large" | "medium" | "small"
}

const SignUpBtn: React.FC<Props> = ({ btnSize = "medium" }) => {
    return (
        <NavLink to={"/signup"}>
            <Button
                variant="contained"
                size={btnSize}
            >
                SignUp
            </Button>
        </NavLink>
    )
}

export default SignUpBtn;