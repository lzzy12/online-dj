import {createClient} from 'redis';
import { REDIS_URL } from './secrets';


export const client = createClient({
  url: REDIS_URL,
})
  .on('error', e => console.log(e))
  .connect();
