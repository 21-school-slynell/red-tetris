import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallbackComponent?: ReactNode;
}

export class ErrorBoundary extends React.Component<
ErrorBoundaryProps,
{ hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { fallbackComponent, children } = this.props;
    if (hasError) {
      if (fallbackComponent) {
        return fallbackComponent;
      }
      return <h1>Что-то пошло не так.</h1>;
    }
    return children;
  }
}
