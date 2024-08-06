import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, MenuItem, Select, Grid, Card, CardContent, CardMedia, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import heroesData from '../api/all.json';
import '../styles.css';

const HeroVsVillain = () => {
  const [hero1Id, setHero1Id] = useState('');
  const [hero2Id, setHero2Id] = useState('');
  const [hero1, setHero1] = useState(null);
  const [hero2, setHero2] = useState(null);
  const [battleDetails, setBattleDetails] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  useEffect(() => {
    const hero1 = heroesData.find(hero => hero.id === hero1Id);
    const hero2 = heroesData.find(hero => hero.id === hero2Id);
    setHero1(hero1);
    setHero2(hero2);
  }, [hero1Id, hero2Id]);

  const determineWinner = (hero1, hero2) => {
    const stats1 = hero1.powerstats;
    const stats2 = hero2.powerstats;

    let hero1Score = 0;
    let hero2Score = 0;
    const statComparison = {};

    Object.keys(stats1).forEach(stat => {
      if (stats1[stat] > stats2[stat]) {
        hero1Score++;
        statComparison[stat] = `${hero1.name} wins in ${stat}`;
      } else if (stats1[stat] < stats2[stat]) {
        hero2Score++;
        statComparison[stat] = `${hero2.name} wins in ${stat}`;
      } else {
        statComparison[stat] = `Both are equal in ${stat}`;
      }
    });

    let winner;
    if (hero1Score > hero2Score) {
      winner = hero1.name;
    } else if (hero2Score > hero1Score) {
      winner = hero2.name;
    } else {
      winner = 'Draw';
    }

    const strengthsWeaknesses = {
      hero1: hero1.biography,
      hero2: hero2.biography,
    };

    const narrative = generateBattleNarrative(hero1, hero2, statComparison, winner);

    return {
      winner,
      statComparison,
      strengthsWeaknesses,
      narrative,
    };
  };

  const generateBattleNarrative = (hero1, hero2, statComparison, winner) => {
    let narrative = `In an epic battle between ${hero1.name} and ${hero2.name}, both heroes fought valiantly. `;
    narrative += `${hero1.name} started off strong, leveraging their ${statComparison.intelligence || 'intelligence'} and ${statComparison.strength || 'strength'} to gain an advantage. `;
    narrative += `${hero2.name}, however, was not to be outdone and countered with their superior ${statComparison.speed || 'speed'} and ${statComparison.combat || 'combat skills'}. `;
    narrative += `Throughout the battle, ${hero1.name} demonstrated ${hero1.biography.alignment} qualities, while ${hero2.name} showed ${hero2.biography.alignment} traits. `;
    narrative += `In the end, ${winner === 'Draw' ? 'neither hero emerged as the clear winner, resulting in a draw' : `${winner} emerged as the victor due to their superior ${statComparison[Object.keys(statComparison).find(stat => stat.includes(winner.toLowerCase()))]}`}.`;

    return narrative;
  };

  const handleGenerateBattle = () => {
    if (hero1 && hero2) {
      const details = determineWinner(hero1, hero2);
      setBattleDetails(details);
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
    setBattleDetails(null);
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
        <Paper sx={{ p: 2, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Grid container spacing={3}>
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
          {battleDetails && (
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" className="comic-commentary-title">Battle Winner</Typography>
              <Typography variant="body1" className="comic-commentary" paragraph>
                {battleDetails.winner}
              </Typography>
              <Typography variant="h4" className="comic-commentary-title">Stats Comparison</Typography>
              <Typography variant="body1" className="comic-commentary" paragraph>
                {Object.keys(battleDetails.statComparison).map(stat => (
                  <div key={stat}>
                    {battleDetails.statComparison[stat]}
                  </div>
                ))}
              </Typography>
              <Typography variant="h4" className="comic-commentary-title">Strengths & Weaknesses</Typography>
              <Typography variant="body1" className="comic-commentary" paragraph>
                {battleDetails.hero1}: {battleDetails.strengthsWeaknesses.hero1.alignment}
                <br />
                {battleDetails.hero2}: {battleDetails.strengthsWeaknesses.hero2.alignment}
              </Typography>
              <Typography variant="h4" className="comic-commentary-title">Battle Narrative</Typography>
              <Typography variant="body1" className="comic-commentary" paragraph>
                {battleDetails.narrative}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default HeroVsVillain;








































