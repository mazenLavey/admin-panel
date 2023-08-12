import LogInForm from "common/LogInForm";
import SignUpForm from "common/SignUpForm";
import { useLocation } from "react-router-dom";
import './index.css';

const Register: React.FC = () => {
    const location = useLocation();
    const path: string = location.pathname;

    return (
        <main className="Register">
            {
                path === "/login" ?
                    <LogInForm />
                    :
                    <SignUpForm />
            }
        </main>
    )
}

export default Register;