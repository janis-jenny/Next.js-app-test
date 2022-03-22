import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetUpDetails(props) {
    return (
        <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        />
    )
}

// only use it when the page component is a dynamic pages and when you use getStaticProps only,
// it tells next fromthis dynamic parameter values should be pre generated
export async function getStaticPaths() {

    const client = await MongoClient.connect(
        'mongodb+srv://janis-jenny:3hV8uSGutv4bIsED@cluster0.4jkrw.mongodb.net/meetups?retryWrites=true&w=majority'
        ); //return promise
    const db = client.db(); //to connect w db
    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find({}, 
        {_id: ObjectId()}).toArray() //find all objects ({}), fields that should be extracted by every document, only include the id (1)
    
    client.close();

    return {
        fallback: false, // tells if my paths array contains all supported parameter(id) values (false) or just some of them
        // if the user try acces to m3 they will get a 404 error when is false,
        // if is true next will try to generate a page for the m3 meetup dynamically on the server
        // allows you to pregenerate some of ur pages for specific id values like the most pospular ones
        // and pregenerate the missing ones dynamically when request are coming in
          //paths:holds key value pairs that lead to dynamic pages even for dynamic segments
          paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()} //this generate the array of paths dynamically
          }))
        
    }

}
// This is a dynamic page, we need id, but cant use useRouter hook to get access to the router object and use a query property
// it is only used in a component function
export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://janis-jenny:3hV8uSGutv4bIsED@cluster0.4jkrw.mongodb.net/meetups?retryWrites=true&w=majority'
        ); //return promise
    const db = client.db(); //to connect w db
    const meetupsCollections = db.collection('meetups');
    // access to a single meetup
    const selectedMeetup = await meetupsCollections.findOne({_id: ObjectId(meetupId)}); //finds one single document and filter w the argument
    
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default MeetUpDetails;