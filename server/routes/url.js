const shortid = require('shortid');
const router = require("express").Router();
const Url = require('../models/url');
const QRCode = require('qrcode');

router.post('/shorten', async (req, res) => {
    const { originalUrl, userId } = req.body;

    if (!originalUrl || !userId) {
        return res.status(400).json({ error: true, message: 'Original URL and user ID are required' });
    }

    try {
        const urlCode = shortid.generate();
        const shortUrl = `${req.protocol}://${req.get('host')}/url/${urlCode}`;

        const qrCode = await QRCode.toDataURL(shortUrl);

        const newUrl = new Url({
            originalUrl,
            shortUrl,
            urlCode,
            userId,
            qrCode,
        });

        await newUrl.save();

        return res.status(201).json({ error: false, shortUrl,qrCode,  message: 'URL shortened successfully' });
    } catch (err) {
        console.error('Error shortening URL:', err);
        return res.status(500).json({ error: true, message: 'Server error' });
    }
});

router.get('/:urlCode', async (req, res) => {   
    const { urlCode } = req.params;

    if (!urlCode) {
        return res.status(400).json({ error: true, message: 'URL code is required' });
    }

    try {
        const url = await Url.findOne({ urlCode });

        if (!url) {
            return res.status(404).json({ error: true, message: 'URL not found' });
        }

        url.visits.push({ timestamp: new Date() });
        await url.save();

        return res.redirect(url.originalUrl);
    } catch (err) {
        console.error('Error fetching URL:', err);
        return res.status(500).json({ error: true, message: 'Server error' });
    }
});

router.get('/dashboard/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const urls = await Url.find({ userId }, 'originalUrl shortUrl visits qrCode -_id');
        const stats = urls.map(url => ({
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            visitCount: url.visits.length,
            qrCode: url.qrCode,
        }));

        return res.status(200).json({ error: false, stats });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        return res.status(500).json({ error: true, message: 'Server error' });
    }
});

module.exports = router;