import React, { createContext, PureComponent, ReactNode } from 'react';

export enum Userflag {
  LOADING = -1,
  UNKNOWN = 0,
}

// start
interface Model {
  popupView: ReactNode;
  userflag: Userflag;
  userName: string;
  username: string;
  avatar: string;
}
const defaultContextModel: Model = {
  popupView: null,
  userflag: Userflag.LOADING,
  userName: '',
  username: '',
  avatar: '',
};
// end

interface Props {
  children(context: ContextState): React.ReactNode;
}

export interface ContextState extends Model {
  setContextState: PureComponent<Props, Model>['setState'];
}

export const context = createContext<ContextState>(
  defaultContextModel as ContextState
);

const { Provider } = context;

export default class Context extends PureComponent<Props, ContextState> {
  constructor(props) {
    super(props);
    this.state = {
      setContextState: this.setState.bind(this),
      ...defaultContextModel,
    };
  }
  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children(this.state)}</Provider>;
  }
}
