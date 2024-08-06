import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Button, Typography, MenuItem, Select, Grid, Card, CardContent, CardMedia, Paper, Alert, Modal, Backdrop, Fade, TextField, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import heroesData from '../api/all.json'; // Import the local JSON file
import './HeroVsVillain.css'; // Import the CSS file

const HeroVsVillain = () => {
  const [hero1Id, setHero1Id] = useState('');
  const [hero2Id, setHero2Id] = useState('');
  const [hero1, setHero1] = useState(null);
  const [hero2, setHero2] = useState(null);
  const [commentary, setCommentary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [loading, setLoading] = useState(false);

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    const hero1 = heroesData.find(hero => hero.id === hero1Id);
    const hero2 = heroesData.find(hero => hero.id === hero2Id);
    setHero1(hero1);
    setHero2(hero2);
  }, [hero1Id, hero2Id]);

  const generateCommentary = async (hero1, hero2) => {
    setLoading(true); // Show loading indicator
    try {
      const prompt = `Generate a detailed battle commentary between ${hero1.name} and ${hero2.name}, using real comic book knowledge. Include a brief background of each fighter, their strengths and weaknesses, who would win and why, and possible events in the fight. Use their stats and abilities from comic books to determine the winner. If it's too close to call, declare it a draw. At the end of the commentary, clearly state the winner in the format: "And the winner is: [Winner's Name]." If it's a draw, state: "And the result is: Draw." Ensure the last sentence clearly states the winner or draw. Keep the response within 500 tokens.`;
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: 'You are a detailed battle commentator.' }, { role: 'user', content: prompt }],
          max_tokens: 490,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      const commentaryText = response.data.choices[0].message.content;
      setCommentary(commentaryText);

      // Extract the winner or draw from the commentary
      const winnerMatch = commentaryText.match(/And the (winner is|result is): (.+?)\./i);
      if (winnerMatch && winnerMatch[2]) {
        setWinner(winnerMatch[2]);
      } else {
        setWinner("Winner not found");
      }
    } catch (error) {
      console.error('Error generating commentary:', error.response ? error.response.data : error.message);
      setError(error.response && error.response.data ? JSON.stringify(error.response.data) : error.message);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const generateImage = async (hero1, hero2) => {
    try {
      const prompt = `A detailed illustration of a battle between ${hero1.name} and ${hero2.name}, showcasing their powers in action.`;
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
      setError(error.response && error.response.data ? JSON.stringify(error.response.data) : error.message);
    }
  };

  const handleGenerateBattle = async () => {
    if (hero1 && hero2) {
      setShowWinner(false); // Hide winner initially
      await generateCommentary(hero1, hero2);
      await generateImage(hero1, hero2);
      setShowWinner(true); // Show winner after generation
    }
  };

  const handleHero1Change = (event) => {
    const selectedHeroId = parseInt(event.target.value, 10);
    setHero1Id(selectedHeroId);
  };

  const handleHero2Change = (event) => {
    const selectedHeroId = parseInt(event.target.value, 10);
    setHero2Id(selectedHeroId);
  };

  const handleSearchChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const handleSearchChange2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const clearSelections = () => {
    setHero1Id('');
    setHero2Id('');
    setHero1(null);
    setHero2(null);
    setCommentary('');
    setImageUrl('');
    setWinner(null);
    setShowWinner(false);
    setSearchTerm1('');
    setSearchTerm2('');
  };

  const filteredHeroes1 = heroesData.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredHeroes2 = heroesData.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  return (
    <Container maxWidth="md" className="comic-container">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" className="comic-title" gutterBottom>
          DEATH BATTLE AI
        </Typography>
        <Typography variant="h6" className="comic-subtitle" gutterBottom>
          Select two superheroes or villains to see who would win based on their stats, and generate a detailed battle scene.
        </Typography>
        <Typography variant="body1" className="comic-instructions">
          Type a hero's name and then select from the dropdown menu. Repeat for both heroes. or just press the dropdown menu to scroll through what we have
        </Typography>
        {error && (
          <Box sx={{ my: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Paper sx={{ p: 2, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={searchTerm1}
                onChange={handleSearchChange1}
                placeholder="Search for a hero..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="h6" className="comic-label">Hero 1</Typography>
              <Select
                fullWidth
                value={hero1Id}
                onChange={handleHero1Change}
                displayEmpty
                sx={{ backgroundColor: '#fff' }}
              >
                {filteredHeroes1.map(hero => (
                  <MenuItem key={hero.id} value={hero.id}>{hero.name}</MenuItem>
                ))}
              </Select>
              {hero1 && (
                <Card sx={{ mt: 2 }}>
                  <CardMedia component="img" sx={{ height: '300px', width: '100%', objectFit: 'cover' }} image={hero1.images.md} alt={hero1.name} className="comic-image" />
                  <CardContent>
                    <Typography variant="h5" className="comic-hero-name">{hero1.name}</Typography>
                    <Typography variant="body1" className="comic-powerstats">Powerstats:</Typography>
                    <ul className="comic-powerstats-list">
                      <li>Intelligence: {hero1.powerstats.intelligence}</li>
                      <li>Strength: {hero1.powerstats.strength}</li>
                      <li>Speed: {hero1.powerstats.speed}</li>
                      <li>Durability: {hero1.powerstats.durability}</li>
                      <li>Power: {hero1.powerstats.power}</li>
                      <li>Combat: {hero1.powerstats.combat}</li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={searchTerm2}
                onChange={handleSearchChange2}
                placeholder="Search for a hero..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="h6" className="comic-label">Hero 2</Typography>
              <Select
                fullWidth
                value={hero2Id}
                onChange={handleHero2Change}
                displayEmpty
                sx={{ backgroundColor: '#fff' }}
              >
                {filteredHeroes2.map(hero => (
                  <MenuItem key={hero.id} value={hero.id}>{hero.name}</MenuItem>
                ))}
              </Select>
              {hero2 && (
                <Card sx={{ mt: 2 }}>
                  <CardMedia component="img" sx={{ height: '300px', width: '100%', objectFit: 'cover' }} image={hero2.images.md} alt={hero2.name} className="comic-image" />
                  <CardContent>
                    <Typography variant="h5" className="comic-hero-name">{hero2.name}</Typography>
                    <Typography variant="body1" className="comic-powerstats">Powerstats:</Typography>
                    <ul className="comic-powerstats-list">
                      <li>Intelligence: {hero2.powerstats.intelligence}</li>
                      <li>Strength: {hero2.powerstats.strength}</li>
                      <li>Speed: {hero2.powerstats.speed}</li>
                      <li>Durability: {hero2.powerstats.durability}</li>
                      <li>Power: {hero2.powerstats.power}</li>
                      <li>Combat: {hero2.powerstats.combat}</li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button variant="contained" color="secondary" onClick={clearSelections} startIcon={<ClearIcon />} className="comic-clear-button">
              Clear
            </Button>
          </Box>
          {hero1 && hero2 && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button variant="contained" color="secondary" onClick={handleGenerateBattle} className="comic-button">
                Generate Battle Scene
              </Button>
            </Box>
          )}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {commentary && (
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" className="comic-commentary-title">Battle Commentary</Typography>
              <Typography variant="body1" className="comic-commentary" paragraph>
                {commentary.split('\n').map((line, index) => (
                  <span key={index}>{line}<br /></span>
                ))}
              </Typography>
            </Box>
          )}
          {imageUrl && (
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" className="comic-image-title">Battle Scene</Typography>
              <Card sx={{ maxWidth: '100%', mx: 'auto' }}>
                <CardMedia component="img" sx={{ maxWidth: '100%', height: 'auto' }} image={imageUrl} alt="Battle Scene" className="comic-image-generated" />
              </Card>
            </Box>
          )}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showWinner}
            onClose={() => setShowWinner(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={showWinner}>
              <Box className="winner-modal">
                <Typography id="transition-modal-title" variant="h2" component="h2">
                  Winner!
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {winner}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </Paper>
      </Box>
    </Container>
  );
};

export default HeroVsVillain;


































