import React, { useContext, useState } from 'react';
import { SkillsContext } from '../context/SkillsContext';
import { useAuth } from '../context/AuthContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default function Profile() {
  const { skills, updateSkill, deleteSkill, loading } = useContext(SkillsContext);
  const { currentUser } = useAuth();
  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [UpdateOpen, setUpdateOpen] = React.useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editedSkill, setEditedSkill] = useState({
    id: '',
    userId: '',
    userName: '',
    userPhone: '',
    name: '',
    description: '',
    availability: '',
    ratings: 5
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter skills to show only current user's skills
  const userSkills = skills.filter(skill => skill.userId === currentUser?.uid);


  const validateForm = () => {
    const errors = {};
    if (!editedSkill.userName.trim()) errors.userName = 'Name is required';
    if (!editedSkill.name.trim()) errors.name = 'Skill name is required';
    if (!editedSkill.description.trim()) errors.description = 'Description is required';
    if (!editedSkill.availability.trim()) errors.availability = 'Availability is required';
    if (editedSkill.userPhone && !/^[\d\s\-+()]+$/.test(editedSkill.userPhone)) {
      errors.userPhone = 'Invalid phone number format';
    }
    return errors;
  };

  async function handleupdateconfirm(e){
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    const updates = {
      name: editedSkill.name.trim(),
      description: editedSkill.description.trim(),
      availability: editedSkill.availability.trim(),
      ratings: editedSkill.ratings,
      userName: editedSkill.userName.trim(),
      userPhone: editedSkill.userPhone.trim(),
    };

    const result = await updateSkill(editedSkill.id, updates);
    
    setSubmitting(false);

    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Skill updated successfully!',
        severity: 'success'
      });
      setUpdateOpen(false);
      setFormErrors({});
    } else {
      setSnackbar({
        open: true,
        message: `Failed to update skill: ${result.error}`,
        severity: 'error'
      });
    }
  }
  function handleUpdateClose() {
    setUpdateOpen(false);
    setFormErrors({});
  }
  function handleUpdateOpen(skill) {
    setEditedSkill({
      id: skill.id,
      userId: skill.userId,
      userName: skill.userName || '',
      userPhone: skill.userPhone || '',
      name: skill.name || '',
      description: skill.description || '',
      availability: skill.availability || '',
      ratings: skill.ratings || 5
    });
    setFormErrors({});
    setUpdateOpen(true);
  }

  const handleInputChange = (field) => (event) => {
    setEditedSkill({
      ...editedSkill,
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
    setEditedSkill({
      ...editedSkill,
      ratings: newValue
    });
  };


  function handleDelete(skillId) {
    setSelectedSkillId(skillId);
    setDeleteDialog(true);
  }

  function handleDeleteClose() {
    setDeleteDialog(false);
    setSelectedSkillId(null);
  }

  async function handleDeleteConfirm() {
    setSubmitting(true);
    const result = await deleteSkill(selectedSkillId);
    setSubmitting(false);

    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Skill deleted successfully!',
        severity: 'success'
      });
      setDeleteDialog(false);
      setSelectedSkillId(null);
    } else {
      setSnackbar({
        open: true,
        message: `Failed to delete skill: ${result.error}`,
        severity: 'error'
      });
    }
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Check if user is logged in
  if (!currentUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Alert severity="warning">Please log in to view your profile</Alert>
      </Box>
    );
  }

  const Pskills = userSkills.map((s) => (
    <Grid item xs={12} sm={6} md={4} key={s.id}>
      <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 3, height: '100%' }}>
        <CardContent>
          <Typography sx={{ color: '#0288d1', fontSize: 18, fontWeight: 500, mb: 1 }}>
            {s.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {s.description}
          </Typography>
          <Typography variant="body2" sx={{ color: '#43a047', mb: 1 }}>
            Available: {s.availability}
          </Typography>
          <Typography variant="body2" sx={{ color: '#1707f9ff', mb: 1 }}>
            Phone: {s.userPhone || 'Not provided'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={s.ratings || 0} readOnly size="small" />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(s.id)}
            disabled={submitting}
            sx={{
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#c62828'
              }
            }}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleUpdateOpen(s)}
            disabled={submitting}
            sx={{
              backgroundColor: '#01579b',
              '&:hover': {
                backgroundColor: '#014a8f'
              }
            }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));

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

      <div
        style={{
          backgroundImage: 'url(src/image/logo3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          filter: 'blur(6px)',
        }}
      ></div>
      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ color: '#01579b', fontSize: 24, fontWeight: 600 }}>
            {currentUser?.displayName || currentUser?.email || 'My Profile'}
          </Typography>
        </Box>
        
        {userSkills.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Alert severity="info" sx={{ maxWidth: 500, margin: '0 auto' }}>
              You haven't added any skills yet. Go to the Skills page to add your first skill!
            </Alert>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ color: '#666', mb: 2 }}>
              You have {userSkills.length} skill{userSkills.length !== 1 ? 's' : ''} listed
            </Typography>
            <Grid container spacing={2}>
              {Pskills}
            </Grid>
          </Box>
        )}
      </div>
      {/* delete//////////////////////////////////////////////////////////////////////////////////// */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this skill?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete it, it will not appear again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            autoFocus
            disabled={submitting}
            color="error"
          >
            {submitting ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Dialog open={UpdateOpen} maxWidth={'sm'} fullWidth onClose={handleUpdateClose}>
        <DialogTitle sx={{ backgroundColor: '#01579b', color: 'white' }}>
          Update Skill Information
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px' }}>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Update your skill information to keep it current for others who want to swap skills.
          </DialogContentText>
          
          <form onSubmit={handleupdateconfirm}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Personal Information Section */}
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#01579b', mt: 1 }}>
                Personal Information
              </Typography>
              
              <TextField
                label="Your Name"
                value={editedSkill.userName}
                onChange={handleInputChange('userName')}
                variant="outlined"
                fullWidth
                required
                error={!!formErrors.userName}
                helperText={formErrors.userName}
              />
              
              <TextField
                label="Phone Number (Optional)"
                value={editedSkill.userPhone}
                onChange={handleInputChange('userPhone')}
                variant="outlined"
                fullWidth
                type="tel"
                error={!!formErrors.userPhone}
                helperText={formErrors.userPhone || "Optional - for direct contact"}
              />

              {/* Skill Information Section */}
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#01579b', mt: 2 }}>
                Skill Information
              </Typography>
              
              <TextField
                label="Skill Name"
                value={editedSkill.name}
                onChange={handleInputChange('name')}
                variant="outlined"
                fullWidth
                required
                error={!!formErrors.name}
                helperText={formErrors.name}
                placeholder="e.g., Web Development, Guitar Lessons, Cooking"
              />
              
              <TextField
                label="Skill Description"
                value={editedSkill.description}
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
                value={editedSkill.availability}
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
                  Update Your Skill Level
                </Typography>
                <Rating
                  name="skill-rating"
                  value={editedSkill.ratings}
                  onChange={handleRatingChange}
                  size="large"
                />
              </Box>
            </Box>

            <DialogActions sx={{ mt: 3, padding: 0 }}>
              <Button onClick={handleUpdateClose} color="inherit" disabled={submitting}>
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
                {submitting ? <CircularProgress size={24} color="inherit" /> : 'Update Skill'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}