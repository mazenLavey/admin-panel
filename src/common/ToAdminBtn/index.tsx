import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import Button from '@mui/material/Button';

const ToAdminBtn: React.FC = () => {
    return (
        <NavLink to={"/admin"} title="to admin page">
            <Button variant="outlined" size="large" title="to admin page">
                <FontAwesomeIcon icon={faTable} size="xl" />
            </Button>
        </NavLink>
    )
}

export default ToAdminBtn;