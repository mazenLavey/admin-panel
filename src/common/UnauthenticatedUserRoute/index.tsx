import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


type Props = {
    children: React.ReactNode,
}

const UnauthenticatedUserRoute: React.FC<Props> = ({ children }) => {
    const { currectUser } = useContext(AuthContext)

    if (currectUser) {
        return <Navigate to={"/admin"} />
    }

    return (
        <>
            {children}
        </>
    )
}

export default UnauthenticatedUserRoute;