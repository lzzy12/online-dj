import {createClient} from 'redis';


export const client = createClient({
  url: 'redis://default:mypass@20.197.55.120:6379/',
})
  .on('error', e => console.log(e))
  .connect();
