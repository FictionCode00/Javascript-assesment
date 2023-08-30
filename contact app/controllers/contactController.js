const Contact = require("../Models/contactModel")

exports.addContact = async (req, res, next) => {
    try {
        let contact = new Contact(req.body)
        await contact.save()
        res.status(201).json({data:contact})
    }
    catch(err){
        next(err)
    }
}

exports.updateContact =async (req, res, next) => {
    let contactId=req.params['id']
    try {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({data:updatedContact});
    }
    catch(err){
        next(err)
    }
}

exports.getContacts = async(req,res,next) =>{
    try{
        let contacts =await  Contact.find()
        res.status(200).json({data:contacts});
    }
    catch(err){
        next(err)
    }
}

exports.deleteContact=async (req, res, next) => {
    let contactId=req.params['id']
    try {
        const deletedContact = await Contact.findByIdAndDelete(contactId, req.body);
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({data:deletedContact});
    }
    catch(err){
        next(err)
    }
}