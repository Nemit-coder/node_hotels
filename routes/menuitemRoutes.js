const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data
        const newMenu = new MenuItem(data);
        // Below Format is Long format
        // newPerson.name = data.name;
        // newPerson.age = data.age;
        // newPerson.mobile = data.mobile;
        // newPerson.email = data.email;
        // newPerson.address = data.address;

        //Save the new person to the database
        const response = await newMenu.save();
        console.log('data saved');;
        res.status(200).json(response);
    }catch(err){
         console.log(err);   
         res.status(500).json(err, 'Internal Server Error');
    }
})


router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);   
        res.status(500).json(error, 'Internal Server Error');
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await MenuItem.find({taste : tasteType});
            console.log('data fetched');;
            res.status(200).json(response);
        }
        else{
            es.status(400).json({error: 'Invalid taste'})
        }
       
    } catch (error) {
        console.log(error);   
        res.status(500).json(error, 'Internal Server Error');
    }
})

module.exports = router;