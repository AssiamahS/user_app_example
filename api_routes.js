const router = require('express').Router()
const { v4: generateID } = require ('uuid')
const fs = require('fs/promises')

async function getData() {
     const data = await fs.promises.readFile('./db/users.json','utf8')
     return JSON,parse(data)
    }


router.get('/users',async(res, req) => {
    try {
    const usersData = await getData();
        res.json(usersData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router