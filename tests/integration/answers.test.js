const request  = require('supertest');
const mongoose = require('mongoose');

let server;

describe('/answers', () => {
    beforeEach(() => {
        // eslint-disable-next-line global-require
        server = require('../../server');
        jest.setTimeout(30000);
    });
    
    afterEach(async () => {
        await server.close();
    });
      
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
    });
      

    describe('POST /', () => {
        it('Should return status code 200 and only one answer', async () => {
            let contextQuestion = {};
            contextQuestion['passage'] = `
                Super Bowl 50 was an American football game to determine the champion of the National Football League (NFL) for the 2015 season.
                The American Football Conference (AFC) champion Denver Broncos defeated the National Football Conference (NFC) champion Carolina Panthers 24–10 to earn their third Super Bowl title. The game was played on February 7, 2016, at Levi's Stadium in the San Francisco Bay Area at Santa Clara, California.
                As this was the 50th Super Bowl, the league emphasized the "golden anniversary" with various gold-themed initiatives, as well as temporarily suspending the tradition of naming each Super Bowl game with Roman numerals (under which the game would have been known as "Super Bowl L"), so that the logo could prominently feature the Arabic numerals 50.
                `;
            contextQuestion['questions'] = ["Who won the Super Bowl 50?"];
            const res = await request(server).post('/answers').send(contextQuestion);
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
        });
        it('Should return status code 200 and two answer', async () => {
            let contextQuestion = {};
            contextQuestion['passage'] = `
                Super Bowl 50 was an American football game to determine the champion of the National Football League (NFL) for the 2015 season.
                The American Football Conference (AFC) champion Denver Broncos defeated the National Football Conference (NFC) champion Carolina Panthers 24–10 to earn their third Super Bowl title. The game was played on February 7, 2016, at Levi's Stadium in the San Francisco Bay Area at Santa Clara, California.
                As this was the 50th Super Bowl, the league emphasized the "golden anniversary" with various gold-themed initiatives, as well as temporarily suspending the tradition of naming each Super Bowl game with Roman numerals (under which the game would have been known as "Super Bowl L"), so that the logo could prominently feature the Arabic numerals 50.
                `;
            contextQuestion['questions'] = ["Who won the Super Bowl?","When was game played?"];
            const res = await request(server).post('/answers').send(contextQuestion);
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
        });
        it('Should return status code 500', async () => {
            let contextQuestion = {};
            contextQuestion['passage'] = `
                Super Bowl 50 was an American football game to determine the champion of the National Football League (NFL) for the 2015 season.
                The American Football Conference (AFC) champion Denver Broncos defeated the National Football Conference (NFC) champion Carolina Panthers 24–10 to earn their third Super Bowl title. The game was played on February 7, 2016, at Levi's Stadium in the San Francisco Bay Area at Santa Clara, California.
                As this was the 50th Super Bowl, the league emphasized the "golden anniversary" with various gold-themed initiatives, as well as temporarily suspending the tradition of naming each Super Bowl game with Roman numerals (under which the game would have been known as "Super Bowl L"), so that the logo could prominently feature the Arabic numerals 50.
                `;
            const res = await request(server).post('/answers').send(contextQuestion);
            expect(res.statusCode).toBe(500);
        });
        it('Should return status code 404 and error for passage less than 50 characters', async () => {
            let contextQuestion = {};
            contextQuestion['passage'] = `Super Bowl 50 was an American`;
            contextQuestion['questions'] = ["Who won the Super Bowl 50?"];
            const res = await request(server).post('/answers').send(contextQuestion);
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
        it('Should return status code 404 and error for passage been empty', async () => {
            let contextQuestion = {};
            contextQuestion['passage'] = "";
            contextQuestion['questions'] = ["Who won the Super Bowl 50?"];
            const res = await request(server).post('/answers').send(contextQuestion);
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
        it('Should return status code 404 and error for no questions', async () => {
            let contextQuestion = {};
            contextQuestion['passage'] = `
                Super Bowl 50 was an American football game to determine the champion of the National Football League (NFL) for the 2015 season.
                The American Football Conference (AFC) champion Denver Broncos defeated the National Football Conference (NFC) champion Carolina Panthers 24–10 to earn their third Super Bowl title. The game was played on February 7, 2016, at Levi's Stadium in the San Francisco Bay Area at Santa Clara, California.
                As this was the 50th Super Bowl, the league emphasized the "golden anniversary" with various gold-themed initiatives, as well as temporarily suspending the tradition of naming each Super Bowl game with Roman numerals (under which the game would have been known as "Super Bowl L"), so that the logo could prominently feature the Arabic numerals 50.
                `;
            contextQuestion['questions'] = [];
            const res = await request(server).post('/answers').send(contextQuestion);
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
    });
});
