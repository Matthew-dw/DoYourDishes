import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const Landing = () => {
    return (
        <Container maxWidth="sm" className='auth-container'>
            <Typography variant="h2" align="center" gutterBottom> Do Your Dishes</Typography>
            <Typography variant="h5" align="center" gutterBottom> Tired of useless roommates?</Typography>
            <Typography variant="h5" align="center" gutterBottom> Organize your home now</Typography>
            <Grid
            container
            direction="row"
            justify="center"
            >
            <Button variant="contained" color="primary"><Link to='/login' className='link'> Login </Link></Button>
            <Button variant="contained" color="secondary"><Link to='/register' className='link'> Sign up </Link></Button>
            </Grid>
        </Container>
    )
}

export default Landing;