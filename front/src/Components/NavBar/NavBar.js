import useStyles from "./styles";
import memories from "../../contact.png";
import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        <Button
          component={Link}
          to="/contacts/AddContact"
          variant="contained"
          color="primary"
          size="medium"
        >
          Ajouter un contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
