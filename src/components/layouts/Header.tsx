import React, { useState } from 'react';
import { UpdatePhotoButton, TakePhotoButton } from '../ui_parts/Buttons';
import { PhotoNames, takePhoto, updatePhoto } from '../../models/apiFunctions';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <div className='header'>
      <HeaderAppBar appBarText={"Intern Web Application"} />
    </div>
  );
}

type AppBarprops = {
  appBarText: string;
}

const HeaderAppBar = (props: AppBarprops) => {
  return (
    <Box>
      <AppBar position='static'>
      <Toolbar>
        <Typography>
          {props.appBarText}
        </Typography>
      </Toolbar>
      </AppBar>
    </Box>
  );
}