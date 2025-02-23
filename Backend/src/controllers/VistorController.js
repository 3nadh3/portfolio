const Visitor = require('../models/Visitor');

const VistorNumber = async (req, res) => {
    try {
        let visitor = await Visitor.findOne();
        if (!visitor) {
            visitor = new Visitor({ count: 1 });
        } else {
            visitor.count += 1;
        }
        await visitor.save();
        res.json({ count: visitor.count });
    } catch (error) {
        console.error("❌ Error fetching visitor count:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = VistorNumber;
