import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ProfileMap from './ProfileMap';

function ProfileCard({ profile }) {
  const [showSummary, setShowSummary] = useState(false);

  const getPronoun = (gender) => {
    if (gender.toLowerCase() === 'male') {
      return 'He';
    } else if (gender.toLowerCase() === 'female') {
      return 'She';
    }
  }

  return (
    <Card sx={{ width: '100%' }} className="profile-card">
      <CardActionArea>
        <div className='profile-avatar'>
          <Avatar src={profile.image} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${profile.firstName} ${profile.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>{profile.firstName}</strong> aged <strong>{profile.age}</strong> has a height <strong>{profile.height}</strong> and weight <strong>{profile.weight}</strong> respectively. {getPronoun(profile.gender)} is graduated from <strong>{profile.university}</strong> and currently works at <strong>{profile.company.name}</strong> in the <strong>{profile.company.department}</strong> department.
          </Typography>
          {showSummary && <ProfileMap address={profile.address} />}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => setShowSummary(!showSummary)}>
          {showSummary ? 'Close Summary' : 'Summary'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProfileCard;
