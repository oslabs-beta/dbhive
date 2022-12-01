/// <reference types="react" />
type Props = {
    username: string;
    setUsername: (eventTargetValue: string) => void;
    secret: string;
    setSecret: (eventTargetValue: string) => void;
};
declare function Signup(props: Props): JSX.Element;
export default Signup;
