// see `.env.development` and `.env.production`
export const host = process.env.REACT_APP_HOST!;
import fetch from './_fetch';
export default fetch(host);
