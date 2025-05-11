import { Axios, AxiosHeaders } from 'axios'
import GrinchBot from '../bot.js';
import { Loggable } from 'discord-botinator';

const axios = new Axios({
    baseURL: 'http://localhost:3000',
    headers: {
        'api-key': process.env["MOLD_API"]
    },
    
});

// POST methods

export async function moldPlaceLevel(levelid: number, leveltitle: string, victor: string, placement: number, video?: string, author?: string){
    console.log('placing level');
    await axios.post('/api/placelevel/', 
        JSON.stringify({
            discordid: victor,
            levelid: levelid,
            title: leveltitle,
            placement: placement,
            video: video,
            author: author
        }), 
        {
            headers: {
                'api-key': process.env["MOLD_API"],
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function moldCompleteLevel(levelid: number, leveltitle: string, victor: string){
    console.log('completing level');
    await axios.post('/api/completelevel/', 
        JSON.stringify({
            discordid: victor,
            levelid: levelid,
            title: leveltitle,
        }), 
        {
            headers: {
                'api-key': process.env["MOLD_API"],
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function moldMoveLevel(levelid: number, leveltitle: string, placement: number): Promise<string>{
    console.log('moving level');
    return await axios.post('/api/movelevel/', 
        JSON.stringify({
            placement: placement,
            levelid: levelid,
            title: leveltitle,
        }), 
        {
            headers: {
                'api-key': process.env["MOLD_API"],
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            console.log(response);
            return(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export async function moldRegisterUser(discordid: string, uname?: string): Promise<string>{
    console.log('Registering User');
    return await axios.post('/api/registeruser/', 
        JSON.stringify({
            discordid: discordid,
            uname: uname
        }), 
        {
            headers: {
                'api-key': process.env["MOLD_API"],
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            console.log(response);
            return(response.data);
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export async function moldLevelBoard(entries: number): Promise<any>{
    console.log('fetching levelboard');
    return axios.get('/api/levelboard/', 
        {
            headers: {
                'accept': 'application/json',
                'entries': entries.toString()
            }
        }
        )
        .then(function (response) {
            console.log(response);
            const levels = JSON.parse(response.data);
            return(levels);
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}