// /api/new-meetup ->file name acts as a path in the url
//this api routes are not for defining and rendering react components.
// here we define functions that contain server side code, api routes only run on the server
// the functions are triggered whenerver we send a request to this routes
// POST/api/new-meetup


function handler(req, res) {
    // request object(req) contains data for the incoming request, from here we can get headers, body, methods
    // response object(res) will be needed for sending back a response
    if (req.method === 'POST') { //allows to define what kind of request was sent
        const data = req.body; // contains the body of incoming request
        const {title, image, address, description} = data; // 4 fields that is expected to get in req body
    }
}

export default handler;