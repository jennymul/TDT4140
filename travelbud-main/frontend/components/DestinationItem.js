import React, { useState } from "react";
import axios from 'axios';
import "./DestinationItem.css";
import Typography from '@mui/material/Typography';
import {
  TextField, Container,
} from "@mui/material";
import Cookies from "universal-cookie"
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const DestinationItem = () => {
  const navigate = useNavigate();

  const [destinationtitle, setDestinationtitle] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState(null);

  {/*Modal code */ }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleDestinatontitle = (e) => {
    setDestinationtitle(e.target.value);
    setSubmitted(false);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setSubmitted(false);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setSubmitted(false);
  };

  const handlePicture = (e) => {
    const pictureFile = e.target.files[0];
    if (pictureFile) {
      setPicture(pictureFile);
      setPictureURL(URL.createObjectURL(pictureFile));
    }
  };


  const addDestination = (event) => {
    event.preventDefault()

    let data = {
      name: event.target.destinationtitle.value,
      country: event.target.country.value,
      info: event.target.description.value,
      //picture: event.target.picture.value,
      //pictureURL: event.target.pictureURL.value
    }
    const handleDestinationAdded = (response) => {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    const handleError = (error) => {
      console.log(error);
      setError(error.response.data.error);
    }

    const uploadImage = (response) => {

      let formdata = new FormData();

      formdata.append("image", event.target.picture.files[0])
      console.log(formdata);
      axios.post(process.env.REACT_APP_API_URL + "destination/" + response.data.id + "/image",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      ).then(handleDestinationAdded).catch(handleError)
    }

    axios.post(process.env.REACT_APP_API_URL + "destination/", data)
    .then(uploadImage)
    .catch(handleError);
  }

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false)

  // // Handling the form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (destinationtitle === "" || description === "") {
  //     setError(true);
  //   } else {
  //     setSubmitted(true);
  //     setError(false);
  //     axios
  //       .catc((err) => console.log(err));
  //   }
  // }

  // const successMessage = () => {
  //   return (
  //     <div
  //       className="success"
  //       style={{
  //         display: submitted ? "" : "none",
  //       }}
  //     >
  //       <h1>{destinationtitle} er lagt til</h1>
  //     </div>

  //   );
  // };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Fyll ut alle feltene</h1>
      </div>
    );
  };



  return (
    <>
      {/*This is the appbar for travelbud and a toggle for switching on dark mode
    <CssBaseline />

    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="travel explore" href="index">
            <TravelExploreIcon />
                Travelbud
        </IconButton>
        <Box ml={43}>
          <span>Toggle Dark Mode:</span>
          <Switch color="secondary" />
        </Box>
      </Toolbar>
    </AppBar>
    
  */}

      <Container maxWidth="sm">
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          Legg til ny destinasjon
        </Typography>
      </Container>


      <div className="destination-item">

        {/* <TextField id="outlined-basic" label="Land" variant="outlined" /> */}

        <div className="messages">
          {errorMessage()}
          {/*successMessage()*/}
        </div>

        <form id="addDestination" onSubmit={addDestination}>
          <label className="label"></label>


          <TextField
            name="country"
            id="country"
            type="text"
            value={country}
            placeholder="Land"
            onChange={handleCountry}
            required
          />

          <TextField
            name="destinationtitle"
            id="destinationtitle"
            type="text"
            value={destinationtitle}
            placeholder="Navn på destinasjon"
            onChange={handleDestinatontitle}
            required
          />

          <TextField
            name="description"
            id="description"
            type="text"
            value={description}
            placeholder="Beskrivelse"
            onChange={handleDescription}
            multiline
            required
          />

        {/* This is used for adding image to destination */}
        <TextField
          name="picture"
          id="picture"
          type="file"
          accept="image/*"
          placeholder="Link til bilde"
          onChange={handlePicture}
        />

          <label className="label"></label>
          <button type="submit" className="btnDest"> Legg til destinasjon </button>
          {/*Button for preview of destination 
        <Button onClick={handleOpen}>Forhåndsvisning</Button>
        */}
        </form>

        {/*Modal is used for preview of destination card
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Forhåndsvisning av: {destinationtitle}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ wordWrap: "break-word" }}>
              {description}
            </Typography>
            <Typography id="modal-modal-picture">
              {pictureURL && <img src={pictureURL} alt="Forhåndsvisning av bilde" style={{ width: "100%" }} />}
            </Typography>
          </Box>
        </Modal>
      </div>
      */}
      </div>
    </>
  )
}

export default DestinationItem