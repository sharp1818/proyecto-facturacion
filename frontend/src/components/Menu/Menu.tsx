import React, { MouseEventHandler } from 'react';
import styleMenu from './Menu.module.scss'
import { Button } from '@mui/material';

import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import useScreenSize from '../../hooks/useScreenSize';

interface Props {
  name: string
  onClick: MouseEventHandler;
}

const MenuComponent: React.FC<Props> = ({ name, onClick }) => {
  const { width } = useScreenSize();
  return (
    <div>
      <Menu menuButton={<Button>{name}</Button>}
        direction={ width<= 1100 ?'right':'bottom'}
      >
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <SubMenu label="Edit">
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </SubMenu>
        <MenuItem onClick={() => console.log("Print clicked")}>
          Print...
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuComponent;