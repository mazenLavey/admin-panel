import { useContext, useState } from "react";
import { AuthContext } from "context/AuthContext";
import SignUpBtn from 'common/SignUpBtn/index';
import bg from './images/bg.png';
import './index.css';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const { currectUser } = useContext(AuthContext)

    const handleLoading = (e: any) => {
        if (e.target.complete) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 100)
        }
    }

    return (
        <div className='hero'>
            <div className='hero__text'>
                <h1 className='hero__title'>users manager</h1>
                <p className='hero__paragraph'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius deserunt quibusdam exercitationem tempora voluptatibus nisi impedit repudiandae corporis labore ducimus.</p>

                {currectUser ?
                    null
                    :
                    <SignUpBtn btnSize="large" />
                }
            </div>
            <div className='hero__background'>
                <img className='hero__background-img fedeIn-animation' src={bg} alt="background" onLoad={handleLoading} style={isLoaded ? { display: "block" } : { display: "none" }} />
            </div>
        </div>
    )
};

export default Hero;