
import { Outlet } from "react-router-dom";
import Header from "layouts/Header";
import Container from '@mui/material/Container';
import Toastify from "common/Toastify/index";

const RootLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Toastify />
        </>
    )
}

export default RootLayout;