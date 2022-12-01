/// <reference types="react" />
type Props = {
    secret: string;
    setSecret: (eventTargetValue: string) => void;
};
declare function Dashboard(props: Props): JSX.Element;
export default Dashboard;
