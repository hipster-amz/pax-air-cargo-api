import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { COLORS } from '../../config/constants';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: COLORS.DARK_BLUE_GRAY }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: COLORS.WHITE,
              fontWeight: 600,
            }}
          >
            PAX Air Cargo Should-Cost
          </Typography>
          
          <Box>
            <Button
              component={Link}
              to="/"
              sx={{
                color: COLORS.WHITE,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Calculator
            </Button>
            
            <Button
              component={Link}
              to="/schedule"
              sx={{
                color: COLORS.WHITE,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Schedule Search
            </Button>
            
            <Button
              component={Link}
              to="/admin"
              sx={{
                color: COLORS.WHITE,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Admin Panel
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};