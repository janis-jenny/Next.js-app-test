import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetUpDetails(props) {

    if (!props.meetupData) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
          <Head>
            <title>{props.meetupData.title}</title>
            <meta 
              name='description'
              content={props.meetupData.description}/>
          </Head>
          <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
          /> 
        </Fragment>
    )
}

// only use it when the page component is a dynamic pages and when you use getStaticProps only,
// it tells next from this dynamic parameter values should be pre generated
export async function getStaticPaths() {
    // const ids = meetups.maps((meetup)=>meetup.id)
    // const params = ids.map((id)=>({params: {meetupId: id}}))
    const client = await MongoClient.connect(
        'mongodb+srv://janis-jenny:3hV8uSGutv4bIsED@cluster0.4jkrw.mongodb.net/meetups?retryWrites=true&w=majority'
        ); //return promise
    const db = client.db(); //to connect w db
    const meetupsCollections = db.collection('meetups');
    const meetups = await meetupsCollections.find({}, 
        {_id: ObjectId()}).toArray() //find all objects ({}), fields that should be extracted by every document, only include the id (1)
    
    client.close();

    return {
        fallback: 'blocking', // tells if my paths array contains all supported parameter(id) values (false) or just some of them
        // if the user try acces to m3 they will get a 404 error when is false,
        // if is true or 'blocking' next will try to generate a page for the m3 meetup dynamically on the server
        // allows you to pregenerate some of ur pages for specific id values like the most pospular ones
        // and pregenerate the missing ones dynamically when request are coming in,
        // the list of paths specifying here might not be exhaustive there might be more valid pages, and then next will no respond w 404,
        // if it can't find the page inmedietly, it will pregenerate them when need it
        // true: it will return an empty page & then pull down the dynamically generate it content once that's done so u need to handle that cause
        // 'blocking': the user will no see anything until the page was pre generated & the finished page will be served,
        // it will take a lil bit longer for the visitor to get a response but it will be finished
          //paths:holds key value pairs that lead to dynamic pages even for dynamic segments
        paths: meetups.map(meetup => ({
        params: {meetupId: meetup._id.toString()} //this generate the array of paths dynamically
        }))
    }

}
// This is a dynamic page, we need id, but cant use useRouter hook to get access to the router object and use a query property
// it is only used in a component function
export async function getStaticProps(context) {
 
    // const {params} = context;
    // const meetId = params.meetupId
    // const meetupId = context.params.meetupId;
    // const meetup = meetups.find(meetup => meetup.id === meetupId);
    // context get gold of the concrete param values or the value of the dynamic segments of this paths
    // params is an object full of key-value pairs key->meetupId value->what its in the url

    const client = await MongoClient.connect(
        'mongodb+srv://janis-jenny:3hV8uSGutv4bIsED@cluster0.4jkrw.mongodb.net/meetups?retryWrites=true&w=majority'
        ); //return promise
    const db = client.db(); //to connect w db
    const meetupsCollections = db.collection('meetups');
    // access to a single meetup
    const selectedMeetup = await meetupsCollections.findOne({_id: ObjectId(meetupId)}); //finds one single document and filter w the argument
    
    client.close();

    if (!selectedMeetup) { // if we fail to find a meetup for specific id, then return an object where:
        return {
            noFound: true,
        };
    }
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

// Notes from Udemy course:
// Catch-all routes:
// [..slugs] -> to support other routes for loading a single page
// console.log(router) -> {slug: ["2020", "20"]} -> http:www.my-domain.com/posts/2020/20
// it simply consumes a large amount of segments (2 or more specific pages) after /posts endpoint

// you can extract the key params of the dynamic route w useRouter (router.query.meetupId) in the component function
// but you can only use it inside them to send a request to some backend server to fetch data but that only happen in the browser
// if you want to prerender the page w a prepare data use getstaticprops that will happen on the server & runs before the component function runs
// the default behavior is not pregenerate the page when is a dynamic path cause next doesnt know which value of the meetupId will be supported
// we need to tell next.js which path or Id values should be pregenerated with getstaticpaths, the goal is to tell next which instances of this dynamic page
// should be generated.

// fallback: true -> you can decide to only prerender some pages, to avoid pregenerating  rarely visited a pages, cause is a waste of time & resources
// even pages which are not listed as paths can be valid as values, they are generated jsut in time when a request reaches the server
// if (!meetups) {
//  return <p>Loading...</p>
// }
//if it is true, even if an id value is not found there, we can still redenr a page, we dont have to define all posibble pages
// Next will return a page, whith no data then it will load the data in the background & give it to us on the page & rerender it once data is there
// so we need to render a spinner or loading msg until data is loaded