import React, { useCallback, useMemo, useState } from 'react';
import './ProfileList.css'
import ProfileCard from '../../components/ProfileCard';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ProfileSkeleton from '../../components/skeleton/ProfileSkeleton';
import useProfiles from '../../hooks/useProfiles';
import { Typography } from '@mui/material';
import SearchBox from '../../components/SearchBox';

function ProfileList() {
  const { loading, profiles } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value.toLowerCase());
  }, []);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile =>
      profile.firstName.toLowerCase().includes(searchTerm) ||
      profile.lastName.toLowerCase().includes(searchTerm) ||
      profile.age.toString().includes(searchTerm) ||
      profile.height.toString().includes(searchTerm) ||
      profile.weight.toString().includes(searchTerm) ||
      profile.university.toLowerCase().includes(searchTerm)
    );
  }, [profiles, searchTerm]);

  if (loading) return <ProfileSkeleton />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchBox searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Grid container rowSpacing={3} className="justify-content-center profile-grid">
        {
          filteredProfiles?.length > 0 ? (
            filteredProfiles?.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          ) : (
            <Typography sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              No profiles found
            </Typography>
          )
        }
      </Grid>
    </Box>
  );
}

export default ProfileList;