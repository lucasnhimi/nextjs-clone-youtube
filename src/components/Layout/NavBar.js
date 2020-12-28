import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  makeStyles,
  Hidden,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Avatar,
  Divider,
  Typography,
  Button,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import Subscriptions from '@material-ui/icons/Subscriptions';
import Whatshot from '@material-ui/icons/Whatshot';

import VideoLibrary from '@material-ui/icons/VideoLibrary';
import History from '@material-ui/icons/History';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { signIn, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
  },
}));

const primaryMenu = [
  { id: 1, label: 'Início', path: '/', icon: HomeIcon },
  { id: 2, label: 'Em alta', path: '/trendding', icon: Whatshot },
  {
    id: 3,
    label: 'Inscrições',
    path: 'subscriptions',
    icon: Subscriptions,
  },
];

const secondaryManu = [
  { id: 1, label: 'Biblioteca', icon: VideoLibrary },
  { id: 2, label: 'Histórico', icon: History },
];

function NavBar() {
  const classes = useStyles();
  const router = useRouter();
  const [session] = useSession();
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Canal 1' },
    { id: 2, name: 'Canal 2' },
    { id: 3, name: 'Canal 3' },
    { id: 4, name: 'Canal 4' },
    { id: 5, name: 'Canal 5' },
    { id: 6, name: 'Canal 6' },
    { id: 7, name: 'Canal 7' },
    { id: 8, name: 'Canal 8' },
  ]);

  const isSelected = (item) => router.pathname === item.path;

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <List>
        {primaryMenu.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {secondaryManu.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Box>
        {!session ? (
          <Box mx={4} my={2}>
            <Typography variant="body2">
              Faça login para curtur vídeos, comentar e se inscrever.
            </Typography>
            <Box mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<AccountCircle />}
              >
                Fazer login
              </Button>
            </Box>
          </Box>
        ) : (
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                INSCRIÇÕES
              </ListSubheader>
            }
          >
            {subscriptions.map((item) => (
              <ListItem
                key={item.id}
                button
                classes={{ root: classes.listItem }}
                selected={isSelected(item)}
              >
                <ListItemIcon>
                  <Avatar className={classes.avatar}>H</Avatar>
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.listItemText,
                  }}
                  primary={item.name}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );

  return (
    <Hidden mdDown>
      <Drawer
        anchor="left"
        classes={{ paper: classes.desktopDrawer }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  );
}

export default NavBar;
