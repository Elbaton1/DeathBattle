import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import '../styles.css';

const About = () => {
  return (
    <Container maxWidth="md" className="about-container">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" className="about-title" gutterBottom>
          About Death Battle AI
        </Typography>
        <Typography variant="h6" className="about-subtitle" gutterBottom>
          Discover the ultimate battles between your favorite sci-fi characters, superheroes, and villains!
        </Typography>
      </Box>
      <Paper className="about-box" elevation={3}>
        <Typography variant="h4" className="about-section-title">Our Mission</Typography>
        <Typography variant="body1" className="about-text" paragraph>
          At Death Battle AI, our mission is to bring the excitement of epic battles to your fingertips. Whether you are a fan of superheroes, villains, or any sci-fi character, our platform allows you to pit them against each other and see who comes out on top based on their stats and abilities.
        </Typography>
      </Paper>
      <Paper className="about-box" elevation={3}>
        <Typography variant="h4" className="about-section-title">Current Capabilities</Typography>
        <Typography variant="body1" className="about-text" paragraph>
          As of now, Death Battle AI lets users select any two characters from our extensive database to simulate a battle. The system analyzes their stats, such as intelligence, strength, speed, durability, power, and combat skills, to determine the winner. You can see detailed battle narratives and comparisons to understand how each character's abilities contributed to the outcome.
        </Typography>
        <Typography variant="body1" className="about-text" paragraph>
          Our database includes a wide range of characters, not limited to superheroes and villains but also encompassing various sci-fi characters from different universes. This diversity ensures that you can explore countless battle scenarios and enjoy unique matchups.
        </Typography>
      </Paper>
      <Paper className="about-box" elevation={3}>
        <Typography variant="h4" className="about-section-title">Future Capabilities with AI</Typography>
        <Typography variant="body1" className="about-text" paragraph>
          In the future, we aim to enhance our platform with advanced AI capabilities. This will allow us to generate even more detailed and dynamic battle scenes, taking into account complex interactions between characters' abilities, environments, and other factors. AI will also enable us to provide personalized battle scenarios and outcomes, making each battle unique and more exciting.
        </Typography>
        <Typography variant="body1" className="about-text" paragraph>
          Additionally, with AI integration, users will be able to receive real-time battle commentary, visual effects, and interactive elements that will bring the battles to life. We are committed to leveraging the latest advancements in AI technology to make Death Battle AI the most immersive and entertaining battle simulation platform available.
        </Typography>
      </Paper>
      <Paper className="about-box" elevation={3}>
        <Typography variant="h4" className="about-section-title">Technology and Team</Typography>
        <Typography variant="body1" className="about-text" paragraph>
          Our platform is built using modern web technologies, including React for the frontend and various APIs for data. Our team consists of passionate developers and comic book enthusiasts dedicated to creating an engaging and informative experience for our users.
        </Typography>
        <Typography variant="body1" className="about-text" paragraph>
          We constantly strive to improve our platform and welcome feedback from our users. If you have any suggestions or ideas, please feel free to reach out to us.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;


