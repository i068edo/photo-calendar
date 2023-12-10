import { AppBar, Box, Typography } from '@mui/material';
import React from 'react';
import "./../../scss/footer.scss";

export const Footer = () => {
    return (
        <div id='footer' className='footer'>
            <AppBar component='footer' position='static'>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant='caption'>
                      Software Version intern-test-000
                      <br/>
                      Copyright 2023 KINKEI SYSTEM CORPORATION. All Rights Reserved.
                    </Typography>
                </Box>
            </AppBar>
        </div>
    )
}