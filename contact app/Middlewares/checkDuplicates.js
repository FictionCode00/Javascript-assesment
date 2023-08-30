const Contact = require("../Models/contactModel");

const checkDuplicate = async (req, res, next) => {
    // console.log('hiidup')
    const { email, phone } = req.body;
    try {
        const duplicateContact = await Contact.findOne({ email, phone });
        if (duplicateContact) {
            return res.status(409).json({ error: 'Duplicate email and phone.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports={checkDuplicate}