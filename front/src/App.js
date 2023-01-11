import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Contacts from "./Components/Contacts/Contacts";
import Form from "./Components/Forms/Forms";
import { getData } from "./Redux/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/contacts" />} />
          <Route path="/contacts" exact component={Contacts} />
          <Route path="/contacts/AddContact" exact component={Form} />
          <Route path="/contacts/ModifyContacts/:id" exact component={Form} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
