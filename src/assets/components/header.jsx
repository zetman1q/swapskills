import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

const pages = ['Home','Skills', 'Profile', 'AboutUs','Login'];

export default function Header ({ setCurrentPage }) {
  const { currentUser, logout } = useAuth();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('Home');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#01579b', color: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            SKILLSWAP
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {currentUser && (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ margin: 2, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff', color: '#01579b' }}
              >
                Sign Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
