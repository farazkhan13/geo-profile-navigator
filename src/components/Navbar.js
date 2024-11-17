import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function BasicTabs() {
    const location = useLocation();
    const navigate = useNavigate();

    const getInitialTab = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 1;
            case '/':
            default:
                return 0;
        }
    };

    const [value, setValue] = useState(getInitialTab());

    const handleChange = (_, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate('/');
        } else if (newValue === 1) {
            navigate('/dashboard');
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Profile List" />
                    <Tab label="Dashboard" />
                </Tabs>
            </Box>
        </Box>
    );
}

export default BasicTabs;