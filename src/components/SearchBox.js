import { TextField } from '@mui/material'
import React from 'react'

function SearchBox({searchTerm, handleSearchChange}) {
  return (
    <TextField
      className='search-profile-box'
      label="Search Profiles"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
    />
  )
}

export default SearchBox