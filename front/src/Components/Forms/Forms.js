import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  InputAdornment,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import MuiPhoneNumber from "material-ui-phone-number";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const Form = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let location = useLocation();
  const history = useHistory();
  const contact = useSelector((state) => state.Contacts.Contacts).find(
    (item) => item.id === id
  );
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [contactData, setContactData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    identifier: "",
    phoneNumber: "",
    mobilePhoneNumber: "",
    birthday: "",
    gender: "",
    address: "",
    zipCode: "",
    city: "",
    password: "",
    confirmPassword: "",
    image: "",
    documents: [],
  });

  useEffect(() => {
    if (location.pathname !== "/contacts/AddContact" && id && !contact) {
      history.replace("/");
    }
  }, []);

  React.useEffect(() => {
    if (id) {
      setContactData(contact);
    }
  }, [id, contact]);

  const updatState = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const UpdatImageState = ({ base64 }) =>
    setContactData({ ...contactData, image: base64 });
  const submitForm = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch({
        type: "PostData",
        payload: { ...contactData, id: uuidv4() },
      });
      history.push("/");
    } else {
      dispatch({
        type: "UpdateData",
        payload: contactData,
      });
      history.push("/");
    }
    clear();
  };
  const clear = () => {
    setContactData({
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      identifier: "",
      phoneNumber: "",
      mobilePhoneNumber: "",
      birthday: "",
      gender: "",
      address: "",
      zipCode: "",
      city: "",
      password: "",
      confirmPassword: "",
      image: "",
      documents: [],
    });
  };

  const formatBirthday = (birthday) => {
    return birthday
      .split("")
      .map((item, index) => {
        if (index === 4 || index === 6) {
          return `-${item}`;
        } else return item;
      })
      .join("");
  };
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const disabledForm = () => {
    return (
      !ValidateEmail(contactData.email) ||
      !contactData.identifier ||
      contactData.phoneNumber.split(" ").join("").length !== 12 ||
      contactData.mobilePhoneNumber.split(" ").join("").length !== 12 ||
      contactData.zipCode.length !== 5 ||
      !contactData.firstName ||
      !contactData.lastName ||
      contactData.password !== contactData.confirmPassword
    );
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        noValidate
        onSubmit={submitForm}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            width: "100%",
          }}
        >
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={UpdatImageState} />
          </div>
          {contactData.image && <Avatar src={contactData.image} />}
        </div>

        <Typography variant="h6">Coordonnées</Typography>
        <TextField
          name="email"
          variant="outlined"
          label="E-mail"
          error={contactData.email && !ValidateEmail(contactData.email)}
          helperText={
            contactData.email &&
            !ValidateEmail(contactData.email) &&
            "Invalid email"
          }
          fullWidth
          value={contactData.email}
          onChange={updatState}
        />
        <TextField
          name="identifier"
          variant="outlined"
          fullWidth
          error={contactData.identifier && contactData.identifier.length < 3}
          helperText={
            contactData.identifier &&
            contactData.identifier.length < 3 &&
            "Invalid id"
          }
          label="Identifiant"
          value={contactData.identifier}
          onChange={updatState}
        />
        <MuiPhoneNumber
          name="phoneNumber"
          variant="outlined"
          fullWidth
          error={
            contactData.phoneNumber &&
            contactData.phoneNumber.split(" ").join("").length < 12
          }
          helperText={
            contactData.phoneNumber &&
            contactData.phoneNumber.split(" ").join("").length < 12 &&
            "Invalid phone number"
          }
          label="Numéro de portable"
          defaultCountry={"fr"}
          value={contactData.phoneNumber}
          onChange={(value) =>
            setContactData({ ...contactData, phoneNumber: value })
          }
        />
        <MuiPhoneNumber
          error={
            contactData.mobilePhoneNumber &&
            contactData.mobilePhoneNumber.split(" ").join("").length < 12
          }
          helperText={
            contactData.mobilePhoneNumber &&
            contactData.mobilePhoneNumber.split(" ").join("").length < 12 &&
            "Invalid phone number"
          }
          name="mobilePhoneNumber"
          variant="outlined"
          fullWidth
          label="Numéro de téléphone"
          defaultCountry={"fr"}
          value={contactData.mobilePhoneNumber}
          onChange={(value) =>
            setContactData({ ...contactData, mobilePhoneNumber: value })
          }
        />
        <Typography variant="h6">Informations générales</Typography>
        <TextField
          name="Genre"
          variant="outlined"
          fullWidth
          value={contactData.gender}
          select
          label="Genre"
          onChange={(e) =>
            setContactData({ ...contactData, gender: e.target.value })
          }
        >
          <MenuItem value="Male">Monsieur</MenuItem>
          <MenuItem value="Female">Femme</MenuItem>
        </TextField>
        <TextField
          name="firstName"
          variant="outlined"
          fullWidth
          label="Prénom"
          value={contactData.firstName}
          onChange={updatState}
        />
        <TextField
          name="lastName"
          variant="outlined"
          fullWidth
          label="Nom"
          value={contactData.lastName}
          onChange={updatState}
        />
        <TextField
          name="birthday"
          label="Date de naissance"
          type="date"
          value={formatBirthday(contactData.birthday)}
          variant="outlined"
          fullWidth
          defaultValue="1989-12-22"
          onChange={(e) =>
            setContactData({
              ...contactData,
              birthday: e.target.value.split("-").join(""),
            })
          }
        />
        <Typography variant="h6">Adresse</Typography>

        <TextField
          name="address"
          variant="outlined"
          fullWidth
          label="Veuillez renseigner le numéro et la rue"
          value={contactData.address}
          onChange={updatState}
        />
        <TextField
          type="number"
          name="zipCode"
          variant="outlined"
          fullWidth
          error={contactData.zipCode && contactData.zipCode.length !== 5}
          helperText={
            contactData.zipCode &&
            contactData.zipCode.length !== 5 &&
            "code postale invalide"
          }
          label="Code postal"
          value={contactData.zipCode}
          onChange={updatState}
        />
        <TextField
          name="city"
          variant="outlined"
          fullWidth
          label="Ville"
          value={contactData.city}
          onChange={updatState}
        />
        <Typography variant="h6">Sécurité</Typography>
        <TextField
          error={contactData.password && contactData.password.length < 8}
          helperText={
            contactData.password &&
            contactData.password.length < 8 &&
            "doit contenir 8 caractères"
          }
          name="password"
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          onChange={updatState}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((item) => !item)}>
                  {!showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={
            contactData.confirmPassword &&
            contactData.password !== contactData.confirmPassword
          }
          helperText={
            contactData.confirmPassword &&
            contactData.password !== contactData.confirmPassword &&
            "les mots de passes ne sont pas authentiques"
          }
          name="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          variant="outlined"
          onChange={updatState}
          fullWidth
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={disabledForm()}
        >
          {id ? "Modifier un Contact" : "Ajouter un contact"}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="purple"
          size="small"
          onClick={clear}
          fullWidth
          component={Link}
          to="/"
        >
          Mes Contacts
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
