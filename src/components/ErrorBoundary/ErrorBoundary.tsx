import React from 'react';

import { BugFix } from '../Icons';
import { isNotFoundError } from '../../errors';
import NotFound from '../Icons/NotFound';
import Link3D from '../Link3D';

type Props = { render?: () => JSX.Element };
type State = { hasError: boolean; error: Error | null };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    // TODO: send it to sentry?
    this.setState({ hasError: true, error });
  }

  notFoundError() {
    return (
      <section className="flex justify-center flex-1 lg:items-center">
        <div className="flex flex-col-reverse justify-end w-full max-w-4xl p-2 lg:shadow-2xl lg:flex-row">
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
            <div className="w-full text-center lg:text-left lg:w-64">
              <div className="mt-8 lg:mt-0">
                <h3 className="text-5xl font-bold tracking-tight text-gray-800">
                  404
                </h3>
                <div className="w-1/4 h-0 mx-auto border-b-2 border-teal-400 lg:mx-0 lg:w-8"></div>
              </div>
              <p className="mt-4 text-gray-700">
                Ooops... looks like you got lost
              </p>
              <div className="inline-block mt-2">
                <Link3D to="/">GO HOME</Link3D>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-gray-200 lg:w-1/2 h-84">
            <NotFound className="w-64 lg:h-72" />
          </div>
        </div>
      </section>
    );
  }

  defaultError() {
    return (
      <section className="flex justify-center flex-1 lg:items-center">
        <div className="flex flex-col-reverse justify-end w-full max-w-4xl p-2 lg:shadow-2xl lg:flex-row">
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
            <div className="w-full text-center lg:text-left lg:w-64">
              <div className="mt-8 lg:mt-0">
                <h3 className="text-5xl font-bold tracking-tight text-gray-800">
                  500
                </h3>
                <div className="w-1/4 h-0 mx-auto border-b-2 border-teal-400 lg:mx-0 lg:w-8"></div>
              </div>
              <p className="mt-4 text-gray-700">
                Sorry, there was an unexpected error.
              </p>
              <div className="inline-block mt-2">
                <Link3D to="/">GO HOME</Link3D>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-gray-200 lg:w-1/2 h-84">
            <BugFix className="w-64 lg:h-72" />
          </div>
        </div>
      </section>
    );
  }

  renderError() {
    if (!this.state.error) return;

    if (isNotFoundError(this.state.error)) {
      return this.notFoundError();
    }

    return this.defaultError();
  }

  render() {
    if (this.state.hasError) {
      const { render } = this.props;
      const content = render ? render() : this.renderError();
      return <div>{content}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
