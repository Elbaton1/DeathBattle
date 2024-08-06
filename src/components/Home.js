import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Info, Star, Whatshot } from '@mui/icons-material';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import '../styles.css';

const funFacts = [
  "Spider-Man's webbing dissolves after an hour.",
  "Batman once lifted a city block with the help of his Batmobile's winch.",
  "Wonder Woman's real name is Diana Prince.",
  "Superman was sent to Earth as a baby to escape Krypton's destruction.",
  "Iron Man created his powered armor suit to save his life.",
  "Thor wields the powerful hammer Mjolnir and can control lightning.",
  "The Hulk's strength is potentially limitless and increases with his level of anger.",
  "The Flash can run at speeds faster than the speed of light.",
  "Aquaman can communicate telepathically with sea creatures.",
  "Black Panther is not only a superhero but also the king of Wakanda.",
  "Doctor Strange was a renowned neurosurgeon before becoming the Sorcerer Supreme.",
  "Captain America's shield is made of vibranium, the same material found in Black Panther's suit.",
  "Green Lantern's power ring is one of the most powerful weapons in the universe.",
  "Wolverine's healing factor allows him to recover from almost any injury.",
  "Deadpool is known for his regenerative healing factor and breaking the fourth wall.",
  "Magneto has the ability to control magnetic fields and is one of the X-Men's greatest foes.",
  "Silver Surfer can travel faster than the speed of light on his cosmic surfboard.",
  "Daredevil, despite being blind, has heightened senses that make him a formidable fighter.",
  "Hawkeye is a master archer with incredible accuracy.",
  "Scarlet Witch can manipulate reality with her chaos magic."
];

const Home = () => {
  return (
    <Container maxWidth="lg" className="container moving-background">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" className="title" gutterBottom>
          Welcome to DEATH BATTLE AI
        </Typography>
        <Typography variant="h6" className="subtitle" gutterBottom>
          Discover epic battles between your favorite heroes and villains, soon to be powered by AI!
        </Typography>
        <Button variant="contained" component={Link} to="/battle" className="button">
          Start a Battle
        </Button>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" className="card-title">Featured Fights</Typography>
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
                    <Info sx={{ marginRight: 1, color: '#FFEB3B' }} />
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
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" className="card-title">Hero Spotlight</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card className="card">
              <CardContent className="card-content">
                <Star sx={{ marginRight: 1, color: '#FFD700' }} />
                <Typography variant="h6">Spider-Man</Typography>
                <Typography variant="body2">
                  Spider-Man is one of the most popular and commercially successful superheroes. He has superhuman strength, speed, reflexes, and the ability to cling to most surfaces.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="card">
              <CardContent className="card-content">
                <Star sx={{ marginRight: 1, color: '#FFD700' }} />
                <Typography variant="h6">Batman</Typography>
                <Typography variant="body2">
                  Batman, also known as the Dark Knight, is one of the most iconic superheroes. He is a master detective, martial artist, and has an arsenal of high-tech gadgets.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="card">
              <CardContent className="card-content">
                <Star sx={{ marginRight: 1, color: '#FFD700' }} />
                <Typography variant="h6">Wonder Woman</Typography>
                <Typography variant="body2">
                  Wonder Woman, an Amazonian princess, possesses superhuman strength, speed, and agility. She wields the Lasso of Truth, indestructible bracelets, and a variety of weapons.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" className="card-title">Recent News</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className="card">
              <CardContent className="card-content">
                <Whatshot sx={{ marginRight: 1, color: '#FF4500' }} />
                <Typography variant="h6">New Avengers Movie Announced</Typography>
                <Typography variant="body2">
                  Marvel Studios has announced a new Avengers movie set to release next year. The movie promises to bring together the biggest heroes in the Marvel universe for an epic showdown.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="card">
              <CardContent className="card-content">
                <Whatshot sx={{ marginRight: 1, color: '#FF4500' }} />
                <Typography variant="h6">Batman Arkham Series</Typography>
                <Typography variant="body2">
                  A new installment in the Batman Arkham series has been confirmed by Warner Bros. Interactive Entertainment. Fans can expect new villains and a darker storyline.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;








