import { NavLink, useLocation } from "react-router-dom";
import Container from '@mui/material/Container';
import LogoutBtn from "common/LogoutBtn/index";
import ToAdminBtn from "common/ToAdminBtn/index";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import LogInBtn from "common/LogInBtn/index";
import SignUpBtn from "common/SignUpBtn";
import logo from './images/logo.png';
import './index.css';

const Header: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const { currectUser } = useContext(AuthContext)

    return (
        <header className="Header">
            <Container>
                <div className="Header__wrapper">
                    <NavLink className="Header__logo-container" to={"/"}>
                        <img className="Header__logo" src={logo} alt="logg" />
                    </NavLink>
                    <div className="Header__actions">
                        {currectUser ?
                            <>
                                {path !== "/admin" ? <ToAdminBtn /> : null}
                                <LogoutBtn />
                            </>
                            :
                            path === "/login" ? <SignUpBtn /> : <LogInBtn />
                        }
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header;