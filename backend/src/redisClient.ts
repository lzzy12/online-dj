import {createClient} from 'redis';


export const client = createClient({
  url: 'redis://default:redispw@localhost:32768/',
})
  .on('error', e => console.log(e))
  .connect();
