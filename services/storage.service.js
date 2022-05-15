import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(process.cwd(), 'weather-data.json');

export const TOKEN_DICT = {
    token: 'token',
    city: 'city'
}

export const saveKeyValue = async (key, value) => {
    let data = {};

    if (await isExist(filePath)) {
        const fileDataStr = await promises.readFile(filePath);
        const fileDataObj = JSON.parse(fileDataStr);

        fileDataObj[key] = value;
        await promises.writeFile(filePath, JSON.stringify(fileDataObj))

        return;
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
}

export const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
}

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch(err) {
        return false;
    }
}

export const getCity = async () => {
    const str = await promises.readFile(filePath);
    const obj = JSON.parse(str);

    return obj.city;
}