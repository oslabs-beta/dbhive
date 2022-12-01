/// <reference types="react" />
type Props = {
    username: string;
    setUsername: (eventTargetValue: string) => void;
    secret: string;
    setSecret: (eventTargetValue: string) => void;
};
declare function Login(props: Props): JSX.Element;
export default Login;
