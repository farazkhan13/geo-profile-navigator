import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';

function DashboardTableRowSkeleton() {
  return (
    <Stack spacing={2} padding={3}>
      <Skeleton variant="rounded" height={40} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" height={60} />
    </Stack>
  )
}

export default DashboardTableRowSkeleton;