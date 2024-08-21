const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddlware, generateToken} = require('./../jwt');

router.post('/', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data
        const newPerson = new Person(data);
        // Below Format is Long format
        // newPerson.name = data.name;
        // newPerson.age = data.age;
        // newPerson.mobile = data.mobile;
        // newPerson.email = data.email;
        // newPerson.address = data.address;

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(response.username);
        console.log('Token is : ', token);
        res.status(200).json({response: response, token: token});
    }catch(err){
         console.log(err);   
         res.status(500).json(err, 'Internal Server Error');
    }
})


// Login Route
router.post('/login', async(req, res) => {
    try {
        // Extract username and password from request body
        const {username, password} = req.body;

        //Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate token
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        //return token as response
        res.json({token})
    } catch (error) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);   
        res.status(500).json(error, 'Internal Server Error');
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == "chef" || workType == "manager" || workType == "waiter"){
            const response = await Person.find({work: workType})
            console.log('data fetched');;
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error: 'Invalid work type'})
        }
    } catch (error) {
        console.log(error);   
        res.status(500).json(error, 'Internal Server Error');
    }
})

router.put('/:id', async (req, res) => {
   try{
    const personId = req.params.id;
    const updatedPeronsData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPeronsData, {
        new: true,
        runValidators: true
    })

    if(!response){
        return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');;
    res.status(200).json(response);
   }catch(err){
    console.log(err);   
    res.status(500).json({error: 'Internal Server Error'});
   }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response) {
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'});
    }catch(err){
        console.log(err);   
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;