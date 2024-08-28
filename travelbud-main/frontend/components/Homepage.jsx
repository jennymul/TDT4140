import {React, useEffect, useState} from "react";
import {Typography, Card, Box,IconButton, Grid, AppBar, CardMedia,CardContent,
     CssBaseline, CardActionArea, Toolbar, Container, Fab} from '@mui/material';
//import Switch from "@mui/material"
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
//import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios"
import { useNavigate , Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const HomePage = () => {
    const importImage = (name) => {
        try {
            // why does this not work without the extra ""?
            let img = require("" + name)
            return img
        } catch {
            let img = require("./Assets/Rio.jpg")
            return img
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "userinfo/").catch(error => {
            // User is not logged in.
            navigate("/login");
        })
    }, [])
    
    const [isAdmin, setIsAdmin] = useState(false);
    const isadmin = () => {
        axios.get(process.env.REACT_APP_API_URL + "userinfo/")
        .then(response => {
            let is_superuser = response.data.is_superuser;
            setIsAdmin(is_superuser);
        }).catch(() => {})
    }
    isadmin();

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "destination/").then((response) => {
            setDestinations(response.data);

        }).catch((error) => {

        });
    }, []);
    
    return (
        <>
            <CssBaseline />
            
            <AppBar position="fixed"> 
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="travel explore" href="/">
                        <TravelExploreIcon />
                        Travelbud
                    </IconButton>

                    { isAdmin && (<Box ml={10}>
                        <Typography variant="body1">
                            <span>Add destination: <Fab color="default" aria-label="add" size="small" onClick={() => {navigate("/add_destination")}}><AddIcon /></Fab></span>
                        </Typography>
                    </Box>
                    )}

                    <Box display="flex" alignItems="center" ml={170}>
                        <LogoutIcon color="black" aria-label="Logout" href="logout" />
                        <Typography variant="body1" component="a" href="logout" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '4px'}}>Logout</Typography>
                    </Box>

                    
                    {/*
                    <Box display="flex" alignItems="center" ml={17} >
                        <FilterListIcon color="black" aria-label="travel filter" href="explore" />
                        <Typography variant="body1" component="a" href="explore" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '4px'}}>Filter</Typography>
                    </Box>
                    */}

                    {/*<Box ml={43}>
                        <span>Toggle Dark Mode:</span>
                        <Switch color="secondary" />
                    </Box> */}
                    
                    {/* <Box>
                        <Typography variant="body1">
                            <a href="profile" style={{ color: 'inherit', textDecoration: 'none' }}>Profile</a>
                        </Typography>
                    </Box>*/}

                </Toolbar>
            </AppBar> 

            <Container maxWidth="sm" style={{marginTop : "80px"}}>
                <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                    Explore destinations
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                    Welcome to travelbud! Find your next destination here.
                </Typography>
            </Container>

            <Grid container spacing={5}>
            {destinations.map((destination, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link to={"/destination/" + destination.id} style={{textDecoration: "none"}}>
                    <Card>
                        <CardActionArea>
                        <CardMedia 
                            component="img"
                            alt={destination.name}
                            image={importImage("./Assets/destination/" + destination.id + ".jpg")}
                            title={destination.name}
                            height="200"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {destination.name}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                    </Link>
                </Grid>
            ))}
            </Grid>
               
        </>
    );
};

export default HomePage;