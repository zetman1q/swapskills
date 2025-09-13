import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function Skill({skill}) {
  // Handle both old and new data structures
  const skillData = skill || {};
  
  // Extract user name - support both old and new structure
  const userName = skillData.userName || skillData.user?.name || 'Unknown User';
  const userPhone = skillData.userPhone || skillData.user?.phone || 'Not provided';
  const skillName = skillData.name || 'Untitled Skill';
  const description = skillData.description || 'No description available';
  const availability = skillData.availability || 'Not specified';
  const ratings = skillData.ratings || 0;

  return (
    <Card sx={{
      minWidth: 275,
      boxShadow: 3,
      borderRadius: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6
      }
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <PersonIcon sx={{ color: '#01579b', fontSize: 20 }} />
          <Typography sx={{ color: '#01579b', fontSize: 18, fontWeight: 600 }}>
            {userName}
          </Typography>
        </Box>
        
        {/* Skill Title */}
        <Typography sx={{ color: '#0288d1', fontSize: 20, fontWeight: 500, mb: 1 }}>
          {skillName}
        </Typography>
        
        {/* Skill Description */}
        <Typography variant="body2" sx={{ mb: 2, color: '#555', minHeight: '40px' }}>
          {description}
        </Typography>
        
        {/* Availability */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <ScheduleIcon sx={{ fontSize: 16, color: '#43a047' }} />
          <Typography variant="body2" sx={{ color: '#43a047' }}>
            {availability}
          </Typography>
        </Box>
        
        {/* Phone Number */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <PhoneIcon sx={{ fontSize: 16, color: '#1707f9ff' }} />
          <Typography variant="body2" sx={{ color: '#1707f9ff' }}>
            {userPhone}
          </Typography>
        </Box>
        
        {/* Ratings */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating
            value={ratings}
            readOnly
            size="small"
            precision={0.5}
          />
          <Typography variant="body2" sx={{ color: '#666' }}>
            ({ratings}/5)
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {/* Actions can be added here if needed */}
      </CardActions>
    </Card>
  );
}