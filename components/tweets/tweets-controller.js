const tweetsService = require('./tweets-service');

class tweetsController {
    // async set(req, res, next) {
    //     try {
    //         const { data } = req.body;
    //         await tweetsService.set(data);
    //         return res.json('ok');
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    async get(req, res, next) {
        try {
            const tweets = await tweetsService.get();
            return res.json(tweets);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new tweetsController();