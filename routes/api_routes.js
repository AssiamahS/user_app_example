const router = require('express').Router();
const { v4: generateID } = require('uuid');
const fs = require('fs/promises');
const data = require('../db/data.js');

async function getData() {
    const data = await fs.readFile('./db/users.json', 'utf8');
    return JSON.parse(data);
}



router.get('/api/users', async (request, response) => {
    const data = await getData();
    const nameQuery = request.query.name?.toLowerCase();

    if (nameQuery) {
        const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery);
        return response.json(user)
    };
    response.json(data)
});
//Get user by ID
router.get('/api/users/:id', async (request, response) => {
    const paramId =  request.params.id;
    const user = data.find(uObj => uObj.id == paramId);
    response.json(user || { message: 'User not found by that ID' });
});

function generateID() {
    // Find the maximum ID in the existing data array
    const maxId = data.reduce((max, user) => (user.id > max ? user.id : max), 0);
    // Return the next available ID (maximum ID + 1)
    return maxId + 1;
}

router.post('/api/users', (request, response) => {
    // Ensure that request body contains name and age properties
    if (!request.body.name || !request.body.age) {
        return response.status(400).json({ message: 'Name and age are required' });
    }

    const id = generateID();

    const age = parseInt(request.body.age);

    const newUser = {
    id: id,
    name : request.body.name,
    age : age
    };

    // Add the new user to the data array
    data.push(newUser);

    response.json({
        message: 'User has been added',
        user: newUser
    });
});

module.exports = router;
