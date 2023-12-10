import { Button } from '@mui/material';
import React, { useState } from 'react';
import { takePhoto } from '../../models/apiFunctions';
import { blob } from 'stream/consumers';
import { AddAPhoto, Autorenew, Delete } from '@mui/icons-material';

type TakePhotoButtonProps = {
  onClickedEvent: () => void;
};

export const TakePhotoButton = (props: TakePhotoButtonProps) => {
  return (
    <div>
      <Button variant='contained' onClick={props.onClickedEvent} startIcon={<AddAPhoto />}>Take photo</Button>
    </div>
  );
}

type UpdatePhotoButtonProps = {
  onClickedEvent: () => void;
};

export const UpdatePhotoButton = (props: UpdatePhotoButtonProps) => {
  return (
    <div>
      <Button variant='contained' onClick={props.onClickedEvent} startIcon={<Autorenew/>}>Update photo</Button>
    </div>
  );
}

type DeletePhotoButtonProps = {
  onClickedEvent: () => void;
}

export const DeletePhotoButton = (props: DeletePhotoButtonProps) => {
  return (
    <div>
      <Button variant='contained' color='error' onClick={props.onClickedEvent} startIcon={<Delete/>} >Delete</Button>
    </div>
  );
}