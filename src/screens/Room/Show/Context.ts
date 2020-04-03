import { createContext } from 'react';

import { User } from '../../../generated/graphql';

const Context = createContext<{ user?: User }>({});

export default Context;
