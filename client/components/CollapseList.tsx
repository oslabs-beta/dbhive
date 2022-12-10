import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type Props = {
  label?: string;
  content?: JSX.Element | JSX.Element[] | string;
};

export default function CollapseList(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ maxWidth: '100%' }}>
      <ListItemButton onClick={handleClick} sx={{ color: 'white' }}>
        <ListItemText primary={props.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ color: 'white', textAlign: 'left' }}
      >
        {props.content}
      </Collapse>
    </List>
  );
}
