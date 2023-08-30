var express = require('express');
const { validateContactFields, validateContact, UpdateContactFields } = require('../Middlewares/validator');
const { addContact, updateContact, getContacts, deleteContact } = require('../controllers/contactController');
const { checkDuplicate } = require('../Middlewares/checkDuplicates');
var router= express.Router()


router.get('/',getContacts)
router.post('/',validateContactFields,validateContact,checkDuplicate,addContact)
router.put('/:id',UpdateContactFields,validateContact,checkDuplicate,updateContact)
router.delete('/:id',deleteContact)

module.exports=router;