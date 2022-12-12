import * as React from 'react';
import { useState } from 'react';
import { Card, Typography, Box } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

type Props = {
  cardLabel: string;
  children?: JSX.Element | string | number;
};

function MetricCard(props: Props) {
  const initialWidth = '400px';
  const [width, setWidth] = useState(initialWidth);
  const [buttonIcon, setButtonIcon] = useState<JSX.Element>(<FullscreenIcon />);
  return (
    <Card
      sx={{
        textAlign: 'center',
        ml: '1rem',
        mt: '1rem',
        p: '1rem',
        width: width,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          color: 'white',
          position: 'absolute',
          right: '5px',
          top: '5px',
        }}
        onClick={() => {
          if (width === initialWidth) {
            setWidth(`calc(${window.innerWidth}px - 13.8rem)`);
            setButtonIcon(<FullscreenExitIcon />);
          } else {
            setWidth(initialWidth);
            setButtonIcon(<FullscreenIcon />);
          }
        }}
      >
        {buttonIcon}
      </Box>
      <p>{props.cardLabel}</p>
      <Typography
        variant="h3"
        component="div"
        sx={{ mx: '1rem', color: 'green' }}
      >
        {props.children}
      </Typography>
    </Card>
  );
}

export default MetricCard;
