import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';

function ProfileSkeleton() {
  return (
    <Grid container spacing={3} justifyContent={'center'} marginTop={3}>
      <Stack spacing={1} width={'95%'}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rounded" height={60} />
      </Stack>

      <Stack spacing={1} width={'95%'}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rounded" height={60} />
      </Stack>

      <Stack spacing={1} width={'95%'}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rounded" height={60} />
      </Stack>
      <Stack spacing={1} width={'95%'}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rounded" height={60} />
      </Stack>
    </Grid>
  )
}

export default ProfileSkeleton