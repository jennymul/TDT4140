import {React, useEffect, useState} from "react";
import {Typography, Card, Switch, Box,IconButton, Grid, AppBar, CardMedia,CardContent,
     CssBaseline, CardActionArea, Toolbar, Container, Fab} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios"
import { useNavigate, Link, useParams} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const DestinationSite = () => {
    const importImage = (name) => {
        try {
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
    })
    
    const [isAdmin, setIsAdmin] = useState(false);
    const isadmin = () => {
        axios.get(process.env.REACT_APP_API_URL + "userinfo/")
        .then(response => {
            let is_superuser = response.data.is_superuser;
            setIsAdmin(is_superuser);
        }).catch(() => {})
    }
    isadmin();
    
    const params = useParams();
    const [destination, setDestination] = useState(undefined)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "destination/" + params.id).then((response) => {
            setDestination(response.data)
        }).catch(() => {})
    }, [])


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
                            <span>Add destination: <Fab color="default" aria-label="add" size="small"  onClick={() => {navigate("/add_destination")}}><AddIcon /></Fab></span>
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
                    </Box>
                    
                    <Box>
                        <Typography variant="body1">
                            <a href="profile" style={{ color: 'inherit', textDecoration: 'none' }}>Profile</a>
                        </Typography>
                    </Box>*/}

                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" >
                <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                    More information
                </Typography>
            </Container>
            {destination && (
                <Container style={{ display: 'flex'}}>
                    <Card style={{width : "50%"}}>
                        <CardMedia
                            component="img"
                            alt={destination.title}
                            image={importImage("./Assets/destination/" + destination.id + ".jpg")}
                            title={destination.title}
                            height="400"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {destination.title}
                            </Typography>
                        </CardContent>
                        <CardActionArea>
                            <Link to="/"> Go Back</Link>
                        </CardActionArea>
                    </Card>
            
                    <Card style={{marginLeft: "40px", width: "50%"}}>
                        <CardMedia />
                        <CardContent>
                        <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                            Description:
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            {destination.info}
                        </Typography>
                        </CardContent>
                    </Card>
                </Container>
            )}
               

        </>
    );
};

export default DestinationSite;