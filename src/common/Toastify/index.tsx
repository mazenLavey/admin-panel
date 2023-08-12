
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";


const Toastify = () => {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    );
};


export const toastNotifications = {
    warn: () => toast.warn("You are logged out.", {
        icon: <FontAwesomeIcon icon={faCircleXmark} style={{color: "orange"}} />
    }),
    error: (error: string) => toast.error(`${error}`, {
        icon: <FontAwesomeIcon icon={faCircleXmark} style={{color: "red"}}/>
    }),
    success: () => toast.success("Welcome!", {
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{color: "green"}}/>
    }),
    info: () => toast.info("Inforamtion updated.", {
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{color: "blue"}}/>
    })
}

export default Toastify;