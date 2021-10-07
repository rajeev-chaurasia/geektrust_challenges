import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    colorPrimary: "yellow",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  colorPrimary: {
    background: "linear-gradient(45deg, #FDC830 30%, #F37335 90%)",
  },
});

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.colorPrimary}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            />
            <Typography variant="h6" color="inherit" className={classes.grow} > 
              Finding Falcone!
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default compose(withStyles(styles), withRouter)(Header);
