/// <reference types="react" />
type Props = {
    label: string;
    setInput: (eventTargetValue: string) => void;
    inputClass?: string;
    inputType?: string;
};
declare function Input(props: Props): JSX.Element;
export default Input;
