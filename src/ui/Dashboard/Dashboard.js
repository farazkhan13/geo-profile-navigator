import React, { useCallback, useMemo, useState } from 'react';
import './Dashboard.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useProfiles from '../../hooks/useProfiles';
import DeleteProfileDialog from '../../components/DeleteProfileDialog';
import { useDispatch } from 'react-redux';
import { setProfiles } from '../../store/profile.slice';
import Snackbar from '@mui/material/Snackbar';
import EditProfileDialog from '../../components/EditProfileDialog';
import DashboardTableRowSkeleton from '../../components/skeleton/DashboardTableRowSkeleton';
import { useNavigate } from 'react-router-dom';
import { RemoveRedEye, Delete, Edit } from '@mui/icons-material';
import SearchBox from '../../components/SearchBox';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profiles, loading } = useProfiles();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: null
  });

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

  const openDeleteProfileDialog = useCallback((id) => {
    setProfileToDelete(id);
    setOpenDeleteDialog(true);
  }, []);

  const openEditProfileDialog = useCallback((profile) => {
    setProfileToEdit(profile);
    setOpenEditDialog(true);
  }, []);

  const handleDeleteProfile = useCallback(() => {
    const updatedProfiles = profiles.filter(profile => profile.id !== profileToDelete);
    dispatch(setProfiles(updatedProfiles));
    setOpenDeleteDialog(false);
    setSnackbar({ open: true, message: 'Profile Deleted' });
  }, [profiles, profileToDelete, dispatch]);

  const handleEditProfileSubmit = useCallback((data) => {
    const updatedProfiles = profiles.map(profile => {
      if (profile.id === profileToEdit.id) {
        return { ...profile, ...data };
      }
      return profile;
    });
    dispatch(setProfiles(updatedProfiles));
    setOpenEditDialog(false);
    setProfileToEdit(null);
    setSnackbar({ open: true, message: 'Profile Updated' });
  }, [profiles, profileToEdit, dispatch]);

  const closeSnackbar = useCallback(() => {
    setSnackbar({ open: false, message: '' });
  }, []);

  const navigateToProfile = useCallback((id) => {
    navigate(`/profile/${id}`);
  }, [navigate]);

  const renderTableRow = useCallback((profile) => (
    <TableRow key={profile.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <div className='profile-avatar'>
          <Avatar src={profile.image} />
        </div>
      </TableCell>
      <TableCell>{profile.firstName} {profile.lastName}</TableCell>
      <TableCell>{profile.age}</TableCell>
      <TableCell>{profile.height}</TableCell>
      <TableCell>{profile.weight}</TableCell>
      <TableCell>{profile.university}</TableCell>
      <TableCell>
        <Grid container columnSpacing={3}>
          <Tooltip title="View Details">
            <IconButton onClick={() => navigateToProfile(profile.id)}>
              <RemoveRedEye color='info' className='pointer-cursor' />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => openDeleteProfileDialog(profile.id)}>
              <Delete color='warning' className='pointer-cursor' />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => openEditProfileDialog(profile)}>
              <Edit color='action' className='pointer-cursor' />
            </IconButton>
          </Tooltip>
        </Grid>
      </TableCell>
    </TableRow>
  ), [openDeleteProfileDialog, openEditProfileDialog]);

  if (loading) {
    return <DashboardTableRowSkeleton />
  }

  return (
    <>
      <SearchBox searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {
        filteredProfiles?.length > 0 ? (
          <TableContainer component={Paper} className='profile-table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>University</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProfiles.map(renderTableRow)}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
            No profiles found
          </Typography>
        )
      }

      <DeleteProfileDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleDelete={handleDeleteProfile}
      />
      <EditProfileDialog
        profile={profileToEdit}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        handleEditSubmit={handleEditProfileSubmit}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
}

export default Dashboard;