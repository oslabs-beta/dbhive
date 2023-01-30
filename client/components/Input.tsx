// import dependencies
import * as React from 'react';
import { Box, TextField } from '@mui/material';

type Props = {
  label: string;
  setInput: (eventTargetValue: string) => void;
  inputClass?: string;
  inputType?: string;
  value?: string;
  error?: boolean;
  errorText?: string;
};

// reusable input component to package typical functionalities
function Input(props: Props) {
  return (
    <div className={props.inputClass}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          error={props.error}
          helperText={props.errorText}
          sx={{ width: '100%' }}
          label={props.label}
          variant="filled"
          value={props.value}
          type={props.inputType}
          onChange={(event) => {
            props.setInput(event.target.value);
          }}
        />
      </Box>
    </div>
  );
}

export default Input;
