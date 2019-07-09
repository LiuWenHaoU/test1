import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Redirect, Switch, Route } from 'react-router-dom';

type Params = {
  [key: string]: string;
};

type PathOf<T extends Params> = {
  pathOf(params?: T): string;
  path: string;
};

type Mix<T, A> = (Component: T) => T & A;

export default function withPath<T extends Params>(
  path: string,
  defaultParams: T = {} as T
): Mix<FunctionComponent<RouteComponentProps<T>>, PathOf<T>> {
  return Component => {
    const { displayName, name = 'Component' } = Component;
    let pathOf, withRouteComponent;
    if (Object.keys(defaultParams).length === 0) {
      pathOf = () => path;
      withRouteComponent = (props: RouteComponentProps<T>) =>
        React.createElement(Component, props);
    } else {
      pathOf = getPathOf(path, defaultParams);
      withRouteComponent = () => (
        <Switch>
          <Route
            path={pathOf(keyParams(defaultParams))}
            component={Component}
          />
          <Redirect to={pathOf(defaultParams)} />
        </Switch>
      );
    }
    withRouteComponent.displayName = `withPath(${displayName || name})`;
    withRouteComponent.pathOf = pathOf;
    withRouteComponent.path = path;
    return withRouteComponent;
  };
}

function getPathOf<T extends Params>(path: string, defaultParams: T) {
  const keys = Object.keys(defaultParams);
  return (params: T = defaultParams) =>
    `${path}${keys.map(key => `/${params[key]}`).join('')}`;
}

function keyParams<T extends Params>(params: T) {
  return Object.keys(params).reduce(
    (o, k) => (((o as any)[k] = `:${k}`), o),
    {} as T
  );
}
