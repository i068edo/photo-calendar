import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DeletePhotoButton } from './Buttons';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbTwilightSharpIcon from '@mui/icons-material/WbTwilightSharp';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import { lightBlue, yellow, orange, indigo, grey, pink } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Favorite } from '@mui/icons-material';

type PhotoCardProps = {
  fileName: string,
  isFavorite: boolean,
  deletePhotoFile: (fileName: string) => void,
  favoriteFileName: (fileName: string, isFavorite: boolean) => void,
}

// 画像を載せるカード
export const PhotoCard = (props: PhotoCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(props.isFavorite);

  const onDeletePhotoButtonClicked = () => {
    props.deletePhotoFile(props.fileName);
  }
  const onFavoriteIconClicked = () => {
    props.favoriteFileName(props.fileName, props.isFavorite);
    setIsFavorite(!isFavorite);
  }

  if (props.fileName === undefined) {
    return null;
  }

  const ClassifyTimeFrame = () => {
    const timeFrameStrings = props.fileName.slice(16,18);
    const formatedTimeFrame  = Number(timeFrameStrings);
    let AvatarIcon: JSX.Element;
    let cardHeaderTitle: string;
    let iconColor;

    if( 5 <= formatedTimeFrame && formatedTimeFrame < 11 ){
      AvatarIcon = <AlarmOnOutlinedIcon />;
      iconColor = lightBlue[200];
      cardHeaderTitle = "morning";
    }else if( 11 <= formatedTimeFrame && formatedTimeFrame < 15 ){
      AvatarIcon = <WbSunnyOutlinedIcon/>;
      iconColor = yellow[500];
      cardHeaderTitle = "noon";
    }else if( 15 <= formatedTimeFrame && formatedTimeFrame < 19 ){
      AvatarIcon = <WbTwilightSharpIcon />;
      iconColor = orange[500];
      cardHeaderTitle = "Afternoon";
    }else if( (19 <= formatedTimeFrame && formatedTimeFrame <= 23) || (0 <= formatedTimeFrame && formatedTimeFrame < 5) ){
      AvatarIcon = <DarkModeOutlinedIcon />;
      iconColor = indigo[500];
      cardHeaderTitle = "night";
    }else{
      AvatarIcon = <QuestionMarkRoundedIcon />;
      iconColor =  grey[200];
      cardHeaderTitle = "failed to determine timeIcon";
    }
      
    return (
      <CardHeader avatar={
        <Avatar sx={{ bgcolor: iconColor }} variant="rounded" >
          {AvatarIcon}
        </Avatar>
      } title={cardHeaderTitle}>
      </CardHeader>);
    
  }

  return (
    <div>
        <Card sx={{maxWidth: 330}}>
          {ClassifyTimeFrame()}
            <CardMedia component='img' sx={{height: 300, width: 300}} image={`http://192.168.1.11:8080/getphotos/${props.fileName}`} />
            <CardContent>{props.fileName}</CardContent>
            <CardActions>
              <DeletePhotoButton onClickedEvent={onDeletePhotoButtonClicked} />
                <IconButton aria-label="add to favorites" onClick={onFavoriteIconClicked}>
                  <Favorite sx={ isFavorite ? { color: pink[500]} : {}}/>
                </IconButton>
            </CardActions>
        </Card>
    </div>
  );
}