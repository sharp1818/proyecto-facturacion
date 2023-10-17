import React, { MouseEventHandler } from 'react';
import styleList from './List.module.scss';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface Props {
    onClick?: MouseEventHandler;
    name: string;
    options: { name: string, link: string }[]
}

interface data {
    name: string;
    link: string;
}

const ListComponent: React.FC<Props> = ({ onClick, name, options }) => {
    return (
        <section>
            <Box sx={{ width: '100%', color: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <Typography variant="h5" gutterBottom>
                            {name}
                        </Typography>
                        {name === 'Conéctate'
                            ?
                            <div className={styleList.contact}>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <FacebookIcon />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <TwitterIcon />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <InstagramIcon />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <YouTubeIcon />
                                    </ListItemButton>
                                </ListItem>
                            </div>
                            :
                            <div>
                                {options.map((data: data, index) => (
                                    <ListItem disablePadding key={index}>
                                        <ListItemButton>
                                            <ListItemText primary={data.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </div>
                        }
                    </List>
                </nav>
            </Box>
        </section>
    );
};

export default ListComponent;