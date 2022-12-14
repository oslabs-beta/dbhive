import * as React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
    children?: ReactNode;
}
interface State {
    hasError: boolean;
}
declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(_: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element;
}
export default ErrorBoundary;
