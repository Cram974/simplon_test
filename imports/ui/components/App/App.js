import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import ClsNames from 'classnames';
import {compose, withState, withHandlers} from 'recompose';

import Users from '../Users';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  },
  menu: {
    height: '100%'
  }
});

const App = props => {
  const {classes, theme, toggleMobileDrawer, mobileOpen} = props;

  const drawer = (
    <div>
      <div className={classes.drawerHeader} />
      <Divider />
      <List className={classes.menu}>
        <ListItem button>
          <ListItemText primary="Utilisateurs" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={ClsNames('flex', 'layout-row')}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMobileDrawer}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap>
            Ordinator
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          type="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={toggleMobileDrawer}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          type="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
          className="layout-fill"
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Users />
      </main>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  toggleMobileDrawer: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool
};

App.defaultProps = {
  mobileOpen: false
};

export default compose(
  withStyles(styles, {withTheme: true}),
  withState('mobileOpen', 'setMobileOpen', false),
  withHandlers({
    toggleMobileDrawer: ({setMobileOpen}) => () =>
      setMobileOpen(mobileOpen => !mobileOpen)
  })
)(App);
