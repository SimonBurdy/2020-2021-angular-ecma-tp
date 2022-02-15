import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });



const getFoxImg = () => axios.get('https://randomfox.ca/floof/').then(resp => resp.data.image).catch(() => null);


const getCatFacts = (nb) => axios.get( `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${nb}`).then(resp => resp.data.map(catInfo => catInfo.text)).catch(() => null );


const getHolidays = (year , contryCode) => axios.get( `https://date.nager.at/api/v3/publicholidays/${year}/${contryCode}`).then(resp => resp.data).catch(() => null);


app.post('/' , async (req, res) => {
  let imgFox = await getFoxImg();
  let catFacts =  await getCatFacts(3);
  let holidays = await getHolidays(2022 ,req.body?.countryCode ?? "FR");
  return {
    imgFox,
    catFacts,
    holidays
  };
})




// Only used for dev server, do not remove
app.head('/', () => ({ ping: 'pong' }));

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();