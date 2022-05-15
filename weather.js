#!/usr/bin/env node

import dedent from 'dedent';
import chalk from 'chalk';
import { getArgs } from './helpers/args.js';
import { getCity } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICT } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('No token!');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICT.token, token);
        printSuccess('Token was saved!');
        } catch(err) {
            printError(`Some error ${err.message}`);
        }
}
 
const saveCity = async (city) => {
    if (!city.length) {
        printError('No city!');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICT.city, city);
        printSuccess('City was saved!');
        } catch(err) {
            printError(`Some error ${err.message}`);
        }
}    

const getForecast = async () => {
    try {
    const weather = await getWeather();
    const city = await getCity();
        console.log(
            dedent`${chalk.bgBlue('Weather info')}
            Today in ${city} ${weather.sys.country}:
            🌡️ ${weather.main.temp}
            💨 ${weather.wind.speed}
            🌅 ${new Date(weather.sys.sunrise)}
            🌇 ${new Date(weather.sys.sunset)}
            `
        )
        //console.log(weather);
    } catch(err) {
        if (err?.response?.status === 404) {
            printError('Invalid city');
        } else if (err?.response?.status === 400) {
            printError('Invalid token');
        } else {
            printError(err.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t);
    }

    getForecast();
}

initCLI();