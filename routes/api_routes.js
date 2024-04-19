const router = require('express').Router();
const { v4: generateID } = require('uuid');
const fs = require('fs/promises');

async function getData() {
    const data = await fs.readFile('./db/users.json', 'utf8');
    return JSON.parse(data);
}

router.get('/api/users', async (request, response) => {
    const data = await getData();
    const nameQuery = request.query.name?.toLowerCase();

    if (nameQuery) {
        const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery)
        return response.json(user)
    }
    response.json(data)
});
//Get user by ID
router.get('/users/:id', async (request, response) => {
    const data = await getData()
    const paramId = request.params.id;
    const user = data.find(uObj => uObj.id == paramId)

    response.json(user || { message: 'User not found by that ID' })
});

router.post('/users', async (request, response) => {
    const id = generateID()
    const data = await getData()

    data.push({
        ...request.body,
        id: id
    });

    const formattedData = data.map(user => ({
        id: user.id,
        name: user.name,
        age: parseInt(user.age) // Convert age to integer
    }));


    await fs.writeFile('./db/users.json', JSON.stringify(formattedData, null, 2));


    response.json({
        message: 'User has been added!',
       
    });
});
//Delete User
router.delete('/api/users/:id', async (req, res) => {
    const users = await getData();
    const id = req.params.id;
    const filtered = users.filter(uObj => uObj.id !== id);
    if (users.length > filtered.length) {
        await fs.writeFile('./db/users.json', JSON.stringify(filtered, null, 2))}

    return response.json({
        message: `User with Id of ${id} has been deleted successfully!`
    })
})


module.exports = router;
