import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toastNotifications } from "../Toastify";

const LogoutBtn: React.FC = () => {
    const { logout } = useContext(AuthContext);

    const handleClick = (): void => {
        logout();
        toastNotifications.warn();
    }

    return (
        <Button
            variant="outlined"
            size="large"
            title="Log out"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
        </Button>
    )
}

export default LogoutBtn;