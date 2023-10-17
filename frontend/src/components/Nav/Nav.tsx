import React, { MouseEventHandler } from 'react';
import styleNav from './Nav.module.scss'
import useScreenSize from '../../hooks/useScreenSize';
import MenuComponent from '../Menu/Menu';
import { Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SideMenuComponent from '../SideMenu/SideMenu';

interface Props {
  onClick: MouseEventHandler;
}

const menuItems = [
  "Yu-Gi-Oh!",
  "Magic The Gathering",
  "One Piece Card Game",
  "Digimon Card Game",
  "Pokemon TCG",
  "Accesorios"
];

const handleNavigate = () => {
  console.log('navegando')
}

const Nav: React.FC<Props> = ({ onClick }) => {
  const { width } = useScreenSize();

  return (
    <nav className={styleNav.bgNav}>
      {width <= 1100
        ?
        <div className={styleNav.mobile}>
          <SideMenuComponent />
          <Button variant="text" startIcon={<MailOutlineIcon />}>
            Contáctenos
          </Button>
        </div>
        :
        <div className={styleNav.desktop}>
          <div className={styleNav.navBar}>
            {menuItems.map((menuItem) => (
              <MenuComponent key={menuItem} name={menuItem} onClick={handleNavigate}/>
            ))}
          </div>
          <Button variant="text" startIcon={<MailOutlineIcon />}>
            Contáctenos
          </Button>
        </div>
      }
    </nav>
  );
};

export default Nav;