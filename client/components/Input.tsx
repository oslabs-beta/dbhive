import * as React from 'react';

type Props = {
  label: string;
  setInput: (eventTargetValue: string) => void;
  inputClass?: string;
  inputType?: string;
  defaultValue?: string;
  value?: string;
};

function Input(props: Props) {
  return (
    <div className={props.inputClass}>
      <label>{props.label}</label>
      <input
        value={props.value}
        defaultValue={props.defaultValue}
        type={props.inputType}
        onChange={(event) => props.setInput(event.target.value)}
      ></input>
    </div>
  );
}

export default Input;
