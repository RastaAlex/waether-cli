import https from 'https';
import axios from 'axios';
import { getKeyValue } from './storage.service.js';
import { TOKEN_DICT } from './storage.service.js';

export const getWeather = async () => {
    const token = await getKeyValue(TOKEN_DICT.token) || process.env.TOKEN;
    const city = await getKeyValue(TOKEN_DICT.city || process.env.city);

    if(!token) {
        throw new Error('No token, plz provide');
    }

    if(!city) {
        throw new Error('No city, plz provide');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lan: 'ru',
            units: 'metric'
        }
    });
    
    return data;
}


