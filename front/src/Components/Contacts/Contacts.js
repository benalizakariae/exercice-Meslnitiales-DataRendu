import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import Contact from "./Contact/Contact";
import NavBar from "../NavBar/NavBar";
const Contacts = () => {
  const { Contacts } = useSelector((state) => state.Contacts);
  const classes = useStyles();

  return (
    <>
      <NavBar />
      {!Contacts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {Contacts?.map((item) => (
            <Grid key={item.id} item xs={12} sm={4} md={3}>
              <Contact contact={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Contacts;
