import React, { MouseEventHandler } from 'react';
import { GetLogo } from '../../utils/helpers';
import styleLogo  from './Logo.module.scss'
import useScreenSize from '../../hooks/useScreenSize';
import { Link } from 'react-router-dom';

interface Props {
    onClick?: MouseEventHandler;
    className: string;
}

const Logo = (props: Props) => {
    const { width } = useScreenSize();
    return (
        <Link color='primary' to="/home"
            className={width <= 500 
                ?
                (props.className === 'black' ? styleLogo.mobileBlack : styleLogo.mobileWhite)
                :
                (props.className === 'black' ? styleLogo.black : styleLogo.white)
            } 
            onClick={props.onClick}>
            <div className={styleLogo.textContainer}>
                <div className={styleLogo.bgTextLogo}>
                    <div className={styleLogo.textOne}>CITIKOLD</div>
                    <div className={styleLogo.textTwo}>GROUP S.A.</div>
                </div>
                <div className={styleLogo.subText}>Agencia marítima</div>
            </div>
            <img src={GetLogo('LOGO')} alt='logo' className={styleLogo.logo}/>
        </Link >
    );
};

export default Logo;