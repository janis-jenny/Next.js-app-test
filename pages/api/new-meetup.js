import { MongoClient } from 'mongodb'; //this is an object that allows us to connect
// /api/new-meetup ->file name acts as a path in the url
//this api routes are not for defining and rendering react components.
// here we define functions that contain server side code, api routes only run on the server
// the functions are triggered whenerver we send a request to this routes
// POST/api/new-meetup

 
async function  handler(req, res) {
    // request object(req) contains data for the incoming request, from here we can get headers, body, methods
    // response object(res) will be needed for sending back a response
    // *we getting a request */
    if (req.method === 'POST') { //allows to define what kind of request was sent
        const data = req.body; // contains the body of incoming request
        //const {title, image, address, description} = data; // 4 fields that is expected to get in req body

        // write code that send queries to mongodb atlas cluster, mongodb driver allows to connect to this cluster 
        // & insert or fetch data //this code will never ende up on the client side, this is a secure palce to store credentials
        //*we store the data in db *//
        const client = await MongoClient.connect(
            'mongodb+srv://janis-jenny:3hV8uSGutv4bIsED@cluster0.4jkrw.mongodb.net/meetups?retryWrites=true&w=majority'
            ); //return promise
        const db = client.db(); //to connect w db
        const meetupsCollections = db.collection('meetups'); //name it as the db and hold on of the meetup collection
        const result = await meetupsCollections.insertOne(data); //query to insert one new document into the collection or db
        // result would be an object w the automatic generated id

        console.log(result);
        client.close(); // call it when the connection to db is done
        // *send back a response *//
        // first set a http status code of the response, 201 indicates something was inserted successfully
        // chain a json response here to prepare the json data that will be added to response
        res.status(201).json({message: 'Meetup inserted!'});
    }
}
// the send a request to this api route fron the front to trigger this handler
export default handler;