import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuComponent from '../Menu/Menu';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {

}

const menuItems = [
    "Yu-Gi-Oh!",
    "Magic The Gatherings",
    "One Piece Card Game",
    "Digimon Card Game",
    "Pokemon TCG",
    "Accesorios"
];

const SideMenuComponent: React.FC<Props> = ({ }) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };


    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 'fit-content' }}
            role="presentation"

            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {menuItems.map((menuItem, index) => (
                    <ListItem key={menuItem} disablePadding>
                        <ListItemButton >
                            <MenuComponent key={index} name={menuItem}  onClick={toggleDrawer(anchor, false)}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {(['bottom'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default SideMenuComponent;