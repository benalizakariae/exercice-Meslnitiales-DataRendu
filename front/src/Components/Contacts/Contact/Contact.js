import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import { Box } from "@mui/system";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const formatBirthday = (birthday) => {
    return birthday
      .split("")
      .map((item, index) => {
        if (index === 4 || index === 6) {
          return `/${item}`;
        } else return item;
      })
      .join("")
      .split("/")
      .reverse("")
      .join("/");
  };
  const deleteContactHandler = (id) => {
    dispatch({
      type: "deletePost",
      payload: id,
    });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          contact.image ? (
            <Avatar alt={contact.firstName} src={contact.image} />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {contact.firstName.split("")[0]}
            </Avatar>
          )
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={() => {
              deleteContactHandler(contact.id);
            }}
          >
            <DeleteIcon fontSize="small" color="Dark" />
          </IconButton>
        }
        title={contact.identifier}
        subheader={`${contact.firstName} ${contact.lastName}`}
      />
      <CardMedia className={classes.media} />
      <CardContent></CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/contacts/ModifyContacts/${contact.id}`}
        >
          <MoreHorizIcon />
        </Button>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "5px",
            }}
          >
            <Box>
              <LocationOnIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary" component="p">
                {contact.address}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {contact.zipCode} {contact.city}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "5px",
            }}
          >
            <Box>
              <PhoneIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary" component="p">
                {contact.phoneNumber}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box>
              <CakeIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary" component="p">
                {formatBirthday(contact.birthday)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Contact;
