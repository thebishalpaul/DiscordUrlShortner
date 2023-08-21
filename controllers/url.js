const { URL } = require('../models/url');
const redirectUrl = async (req, res) => {
    const shortURL = req.params.id;

    try {
        const entry = await URL.findOne({ shortId: shortURL });
        // console.log(entry);
        res.redirect(entry.redirectUrl);
    }
    catch (err) {
        // Handle any other errors that might occur during the database query
        res.status(500).send("Internal Server Error. " + err);
    }
}

module.exports = {
    redirectUrl
}