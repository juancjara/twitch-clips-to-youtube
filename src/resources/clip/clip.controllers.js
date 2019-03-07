const Clip = require('./clip.model');

const getMany = async (req, res) => {
    try {
        const day = req.params.date;
        const clips = await Clip.find({
            day,
        }).lean().exec();

        res.status(200).json({ data: clips })
    } catch(e) {
        console.log(e);
        res.status(400).end();
    }
}

module.exports = {
    getMany
}