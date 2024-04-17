const express = require('express')
const path = require('path')

const app = express()
const PORT = 3333

const data = [
 {
id: 1,
name: 'JD',
age: 44 
},
{
    id: 2,
    name: 'Bob',
    age: 99
},
{

id: 3,
name: 'Sarah',
age: 40
}

]
app.use(express.static('./public'));


app.get('/api/users', (requestObject,responseObject) => {
    const nameQuery = requestObject.query.name.toLowerCase()
    if(nameQuery){
        const user = data.find( uObj => uObj.name.toLowerCase() === nameQuery)
        return responseObject.json(user || {message: 'User not found by that name'}) 
    }

    
    responseObject.json(data)
})




router.get('/api/users/:id', (requestObj, responseObj) => {
   
const paramId = requestObj.param.id
const user = data.find(uObj => uObj.id == paramId)

responseObject.json(user || {message: 'User not found by that ID'})
})
// app.get('/',(requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/html/index.html'))
// // })

// app.listen(PORT, () => {
//     console.log('Server running on port', PORT)
// })

router.post('/users',(requestObj, responseObj) => {
    const id = generateID

    data.push({
        ...requestObj.body,
        id: id
    })
    responseObj.json({
        message: 'Users has been added'
    })
})

module.export = router
// app.get('/api/users',)