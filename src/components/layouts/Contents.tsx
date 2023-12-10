import React, { useCallback, useEffect, useState } from 'react';
import { TakePhotoButton, UpdatePhotoButton } from '../ui_parts/Buttons';
import { PhotoCard } from '../ui_parts/PhotoCards';
import { PhotoNames, deletePhoto, takePhoto, updatePhoto } from '../../models/apiFunctions';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SettingsInputAntenna } from '@mui/icons-material';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import { pink, teal } from '@mui/material/colors';
import { Favorite } from '@mui/icons-material';
import "./../../scss/contents.scss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';



export const Contents = () => {
  const [photoFiles, setPhotoFiles] = useState<PhotoNames>([]);
  const [date, setDate] = useState<string>('2023-09-06');
  const [favoritePhotoFileNames, setFavoritePhotoFileNames] = useState<string[]>([]);

  const Dp = (props: PickersDayProps<Dayjs>) => {
    const { day, ...other } = props;
    const existDate = [...photoFiles];
    const formatedExistDate = existDate.map((value) => value.slice(8,16));
    let dateColor: string | undefined;
    const selectingDate = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);
    let numberOfPhotosPerDay = 0;


    for(let i = 0; i <= formatedExistDate.length; i++){
      if( day.format('YYYYMMDD') == formatedExistDate[i] ){
        numberOfPhotosPerDay++;
      }
    }
    
    if( day.format('YYYYMMDD') != selectingDate ){
      if( numberOfPhotosPerDay == 1 ){
        dateColor = teal[50];
      }else if( numberOfPhotosPerDay == 2 ){
        dateColor = teal[100];
      }else if( numberOfPhotosPerDay == 3 ){
        dateColor = teal[200];
      }else if( numberOfPhotosPerDay == 4 ){
        dateColor = teal[300];
      }else if( numberOfPhotosPerDay == 5 ){
        dateColor = teal[400];
      }else if( numberOfPhotosPerDay == 6 ){
        dateColor = teal[500];
      }else if( numberOfPhotosPerDay == 7 ){
        dateColor = teal[600];
      }else if( numberOfPhotosPerDay == 8 ){
        dateColor = teal[700];
      }else if( numberOfPhotosPerDay == 9 ){
        dateColor = teal[800];
      }else if( numberOfPhotosPerDay >= 10 ){
        dateColor = teal[900];
      }
    }

    const favoriteDate = [...favoritePhotoFileNames];
    const formatedFavoriteDate = favoriteDate.map((value) => value.slice(8,16));
    let existsFavoriteDate: boolean = false;

    for(let i = 0; i <= formatedFavoriteDate.length; i++){
      if( day.format('YYYYMMDD') == formatedFavoriteDate[i] ){
        existsFavoriteDate = true;
      }
    }

    if(existsFavoriteDate){
      return(
        <Badge overlap='circular' badgeContent={<Favorite sx={ { color: pink[500]} }/>}>
          <PickersDay
            style={{background: dateColor}}
            day={day}{...other}
          />
        </Badge>
      )
    }

    return (
      <PickersDay
        style={{background: dateColor}}
        day={day}{...other}
      />
    );
  }

  const [favoriteSwitchChecked, setFavoriteSwitchChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteSwitchChecked(!favoriteSwitchChecked);
    console.log(favoriteSwitchChecked);

  };

  const onDateChange = (value: dayjs.Dayjs | null) => {
    if (value === null) return;
    const clickDate = value.format();
    const formatedDate = clickDate.slice(0, 4) +'-'+ clickDate.slice(5, 7) +'-'+ clickDate.slice(8, 10);
    setDate(formatedDate);       
  }

  const onUpdatePhotoButtonClicked = async () => {
    let hoge = await updatePhoto();
    setPhotoFiles(hoge);
  }

  const onTakePhotoButtonClicked = () => {
    takePhoto();
  }

  const deletePhotoFile = (fileName: string) => {
    const modifyPhotoFiles = [...photoFiles];
    const deleteIndex = modifyPhotoFiles.findIndex(photoFile => photoFile === fileName);
    if (deleteIndex == -1) {
      return;
    }

    modifyPhotoFiles.splice(deleteIndex, 1);
    setPhotoFiles(modifyPhotoFiles);
    deletePhoto(fileName);
  }

  const favoritePhotoFile = (fileName: string, isFavorite: boolean) => {
    if(isFavorite){
      const modifyFavoritePhotoFiles = [...favoritePhotoFileNames];
      const index = modifyFavoritePhotoFiles.findIndex(value => value == fileName);
      if( index == -1 ) { return; }
      modifyFavoritePhotoFiles.splice(index, 1);
      setFavoritePhotoFileNames(modifyFavoritePhotoFiles);
    }else{
      const modifyFavoritePhotoFiles = [...favoritePhotoFileNames];
      modifyFavoritePhotoFiles.push(fileName);
      setFavoritePhotoFileNames(modifyFavoritePhotoFiles);
    }
  }

  type PhotoCardsProps = {
    photoNames: PhotoNames
  }

  const PhotoCards = (props: PhotoCardsProps) => {
    type FilteredPhoto = {
      photoName: string,
      isFavorite: boolean,
    }

    let filteredPhotos: FilteredPhoto[] = [];

    const filteredPhotoName = photoFiles.filter( function( value ) {
      const formatedPhotoName = value.slice(8,16);
      const formatedDate = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);

      if(formatedDate == formatedPhotoName){
        return value;
      }
    })

    filteredPhotoName.forEach(value => {
      const index = favoritePhotoFileNames.findIndex(favoritePhotoFileName => value === favoritePhotoFileName)
      filteredPhotos.push({photoName: value, isFavorite: index != -1});
    })
    
    return (
      <div>
        <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
          {
            filteredPhotos.map((photo, i) => 
            <Grid item key={i}>
              <PhotoCard key={i} fileName={photo.photoName} deletePhotoFile={deletePhotoFile} favoriteFileName={favoritePhotoFile} isFavorite={photo.isFavorite}/>
            </Grid>)
          }
        </Grid>
      </div>
    );
  }

  const FavoritePhotoCards = () => {
    
    return (
      <div>
        <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
          {
            favoritePhotoFileNames.map((photo, i) => 
            <Grid item key={i}>
              <PhotoCard key={i} fileName={photo} deletePhotoFile={deletePhotoFile} favoriteFileName={favoritePhotoFile} isFavorite={true}/>
            </Grid>)
          }
        </Grid>
      </div>
    );
  }

  const OutputFavoriteCards = (): JSX.Element => {
      return (
        <div>
          <Divider variant="middle" /><br/><br/>
          <FavoritePhotoCards />
        </div>
      );
  }
  
  return (
    <div>
      <br/>
      <Stack direction='row' spacing={1}>
        <TakePhotoButton onClickedEvent={onTakePhotoButtonClicked}></TakePhotoButton>
        <UpdatePhotoButton onClickedEvent={onUpdatePhotoButtonClicked}></UpdatePhotoButton>
        <FormControlLabel control={<Switch 
          checked={favoriteSwitchChecked} //状態
          onChange={handleChange} 
          inputProps={{ 'aria-label': 'controlled' }
        }/>} label="Favorite Photo" />
      </Stack>
      <br/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker slots={{ day:Dp }} value={dayjs(date)} onChange={value => onDateChange(value)} />
      </LocalizationProvider>
      <PhotoCards photoNames={photoFiles} />
      <br/><br/>
      {favoriteSwitchChecked && OutputFavoriteCards()}
      <br/><br/><br/><br/>
    </div>
  );
}
