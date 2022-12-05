import * as React from 'react';

import { Card, Typography } from '@mui/material';

type Props = {
  cardLabel: string;
  children: JSX.Element | string | number;
};

function GraphCard(props: Props) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        ml: '1rem',
        mt: '1rem',
        p: '1rem',
        minWidth: '400px',
        maxWidth: '700px',
      }}
    >
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

export default GraphCard;
