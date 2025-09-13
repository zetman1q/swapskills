import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skill from './skill';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

import { useContext, useState } from 'react';
import { SkillsContext } from '../context/SkillsContext';
import { useAuth } from '../context/AuthContext';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

export default function Skillcard() {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const { skills, addSkill, loading } = useContext(SkillsContext);
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skillname: '',
    description: '',
    availability: '',
    ratings: 5
  });
  const [formErrors, setFormErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setFormData({
      name: '',
      phone: '',
      skillname: '',
      description: '',
      availability: '',
      ratings: 5
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.skillname.trim()) errors.skillname = 'Skill name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.availability.trim()) errors.availability = 'Availability is required';
    if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number format';
    }
    return errors;
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      ratings: newValue
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if user is logged in
    if (!currentUser) {
      setSnackbar({
        open: true,
        message: 'You must be logged in to add a skill',
        severity: 'error'
      });
      return;
    }
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    const newSkill = {
      name: formData.skillname.trim(),
      description: formData.description.trim(),
      availability: formData.availability.trim(),
      ratings: formData.ratings,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      userName: formData.name.trim(),
      userPhone: formData.phone.trim(),
    };

    const result = await addSkill(newSkill);
    
    setSubmitting(false);
    
    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Skill added successfully!',
        severity: 'success'
      });
      handleClose();
    } else {
      setSnackbar({
        open: true,
        message: `Failed to add skill: ${result.error}`,
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Simple filter without function call
  let filteredSkills = skills;
  
  if (searchTerm && searchTerm.length > 0) {
    const searchLower = searchTerm.toLowerCase();
    filteredSkills = skills.filter(skill => {
      if (!skill) return false;
      
      const skillName = skill.name ? skill.name.toLowerCase() : '';
      const skillDesc = skill.description ? skill.description.toLowerCase() : '';
      // Support both old and new data structure for user name
      const userName = skill.userName ? skill.userName.toLowerCase() :
                      (skill.user && skill.user.name ? skill.user.name.toLowerCase() : '');
      
      return skillName.includes(searchLower) ||
             skillDesc.includes(searchLower) ||
             userName.includes(searchLower);
    });
  }

  // Show loading state while skills are being fetched
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Container for search bar and button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        {/* Search bar on the left */}
        <Search sx={{ flexGrow: 1, maxWidth: 300 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search skills, descriptions, or users..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Search>
        
        {/* Add skill button on the right */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          disabled={!currentUser}
          sx={{
            backgroundColor: '#01579b',
            marginLeft: 2,
            '&:hover': {
              backgroundColor: '#014a8f'
            }
          }}
        >
          {currentUser ? 'Add Skill' : 'Login to Add Skill'}
        </Button>
      </Box>
      
      <Dialog open={open} maxWidth={'sm'} fullWidth onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: '#01579b', color: 'white' }}>
          Add Your Skill
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px' }}>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Share your skills with the community! Fill in the details below to add a skill that others can swap with.
          </DialogContentText>
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Personal Information Section */}
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#01579b', mt: 1 }}>
                Personal Information
              </Typography>
              
              <TextField
                label="Your Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                variant="outlined"
                fullWidth
                required
                error={!!formErrors.name}
                helperText={formErrors.name}
                autoFocus
              />
              
              <TextField
                label="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                variant="outlined"
                fullWidth
                type="tel"
                error={!!formErrors.phone}
                helperText={formErrors.phone || "Optional - for direct contact"}
              />

              {/* Skill Information Section */}
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#01579b', mt: 2 }}>
                Skill Information
              </Typography>
              
              <TextField
                label="Skill Name"
                value={formData.skillname}
                onChange={handleInputChange('skillname')}
                variant="outlined"
                fullWidth
                required
                error={!!formErrors.skillname}
                helperText={formErrors.skillname}
                placeholder="e.g., Web Development, Guitar Lessons, Cooking"
              />
              
              <TextField
                label="Skill Description"
                value={formData.description}
                onChange={handleInputChange('description')}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                error={!!formErrors.description}
                helperText={formErrors.description}
                placeholder="Describe what you can teach or help with..."
              />
              
              <TextField
                label="Availability"
                value={formData.availability}
                onChange={handleInputChange('availability')}
                variant="outlined"
                fullWidth
                required
                error={!!formErrors.availability}
                helperText={formErrors.availability || "When are you available to share this skill?"}
                placeholder="e.g., Mon-Fri 5pm-8pm, Weekends only"
              />
              
              {/* Skill Rating */}
              <Box>
                <Typography component="legend" sx={{ color: '#666', fontSize: '14px' }}>
                  Rate Your Skill Level
                </Typography>
                <Rating
                  name="skill-rating"
                  value={formData.ratings}
                  onChange={handleRatingChange}
                  size="large"
                />
              </Box>
            </Box>

            <DialogActions sx={{ mt: 3, padding: 0 }}>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  backgroundColor: '#01579b',
                  '&:hover': {
                    backgroundColor: '#014a8f'
                  }
                }}
              >
                {submitting ? <CircularProgress size={24} color="inherit" /> : 'Add Skill'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Skills grid */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {filteredSkills.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="textSecondary">
                  {searchTerm ? 'No skills found matching your search' : 'No skills available yet. Be the first to add one!'}
                </Typography>
              </Box>
            </Grid>
          ) : (
            filteredSkills.map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.id || s.userId}>
                <Skill skill={s} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}