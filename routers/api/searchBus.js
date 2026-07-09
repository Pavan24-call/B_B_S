const express = require("express");
const auth = require("../../middleware/auth");
const Buses = require("../../models/Buses")
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const URL = require('../../config/default.json')
// console.log(URL.mongoURI)

router.get('/', (req, res) => res.send("bus part "))

const escapeRegex = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

router.get("/:start/:end", async (req, res) => {
    const startQuery = req.params.start;
    const endQuery = req.params.end;

    try {
        const startRegex = new RegExp("^" + escapeRegex(startQuery) + "$", "i");
        const endRegex = new RegExp("^" + escapeRegex(endQuery) + "$", "i");

        // Find all buses containing both stops (regardless of direction)
        const buses = await Buses.find({ stops: { $all: [startRegex, endRegex] } });

        const results = buses.map(bus => {
            const busObj = bus.toObject();
            // Deterministic calculations based on name hash for consistency
            const nameHash = bus.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            busObj.rating = parseFloat((((nameHash % 10) / 10) + 4.0).toFixed(1));
            const durationHrs = Math.floor((nameHash % 5) + 3);
            const durationMins = (nameHash % 4) * 15;
            busObj.duration = `${durationHrs}h${durationMins > 0 ? ' ' + durationMins + 'm' : ''}`;
            busObj.fare = (nameHash % 300) + 450; // fare between 450 and 750 INR
            return busObj;
        });

        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
