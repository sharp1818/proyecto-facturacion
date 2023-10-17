import React, { MouseEventHandler } from 'react';
import styleFooter from './Footer.module.scss';
import ListComponent from '../List/List';
import Logo from '../Logo/Logo';

interface data {
    name: string,
    options: { name: string, link: string }[]
}

const Footer = () => {
    const arr = [
        {
            name: 'Citikold Group',
            options: [
                { name: 'Sobre Nosotros', link: '' },
                { name: 'Servicios en línea', link: '' },
                { name: 'Oficina Ecuador', link: '' },
                { name: 'Oficina Perú', link: '' },
                { name: 'CTK LOGISTIC S.A.', link: '' },
            ]
        },
        {
            name: 'Legales',
            options: [
                { name: 'Politicas de privacidad', link: '' },
                { name: 'FAQ', link: '' },
                { name: 'Condiciones de uso', link: '' },
                { name: 'Términos y condiciones', link: '' },
                { name: 'Libro de Reclamaciones', link: '' },
                { name: 'Contáctanos', link: '' },
            ]
        },
        {
            name: 'Conéctate',
            options: [
                { name: 'facebook', link: '' },
                { name: 'twiter', link: '' },
                { name: 'ig', link: '' },
                { name: 'yt', link: '' },
            ]
        },
    ];
    return (
        <footer className={styleFooter.footer}>
            <div className={styleFooter.list}>
                <Logo className={'white'} />
                {arr.map((data: data, index) => (
                    <ListComponent key={index} name={data.name} options={data.options}/>
                ))}
            </div>
            <div className={styleFooter.copyright}>
                © 2023 Citikold Group website todos los derechos reservados
            </div>
        </footer>
    );
};

export default Footer;