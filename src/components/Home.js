import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Info } from '@mui/icons-material';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import './Home.css';

const funFacts = [
  "Spider-Man's webbing dissolves after an hour.",
  "Batman once lifted a city block with the help of his Batmobile's winch.",
  "Wonder Woman's real name is Diana Prince.",
  "Superman was sent to Earth as a baby to escape Krypton's destruction.",
  "Iron Man created his powered armor suit to save his life.",
  "Thor wields the powerful hammer Mjolnir and can control lightning."
];

const Home = () => {
  return (
    <Container maxWidth="lg" className="container moving-background">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" className="title" gutterBottom>
          Welcome to DEATH BATTLE AI
        </Typography>
        <Typography variant="h6" className="subtitle" gutterBottom>
          Discover epic battles between your favorite superheroes and villains, powered by AI!
        </Typography>
        <Button variant="contained" component={Link} to="/battle" className="button">
          Start a Battle
        </Button>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" className="card-title">These pictures look good but the ones generated look terrible srryy</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card className="card">
              <CardMedia
                component="img"
                height="200"
                image={image1}
                alt="Featured Fight 1"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="card">
              <CardMedia
                component="img"
                height="200"
                image={image2}
                alt="Featured Fight 2"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="card">
              <CardMedia
                component="img"
                height="200"
                image={image3}
                alt="Featured Fight 3"
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" className="card-title">Fun Facts</Typography>
        <Grid container spacing={3}>
          {funFacts.map((fact, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="card">
                <CardContent className="card-content">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Info sx={{ marginRight: 1, color: '#ffeb3b' }} />
                    <Typography variant="body1" className="card-text">
                      {fact}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;







