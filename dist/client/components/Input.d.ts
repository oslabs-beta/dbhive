/// <reference types="react" />
type Props = {
    label: string;
    setInput: (eventTargetValue: string) => void;
    inputClass?: string;
    inputType?: string;
    value?: string;
    error?: boolean;
    errorText?: string;
};
declare function Input(props: Props): JSX.Element;
export default Input;
