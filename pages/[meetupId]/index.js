import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetUpDetails() {
    return (
        <MeetupDetail
        image="https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg"
        title= "A First Meetup"
        address='Some Address'
        description='Meet Up description'
        />
    )
}

// only use it when the page component is a dynamic pages and when you use getStaticProps only,
// it tells next fromthis dynamic parameter values should be pre generated
export async function getStaticPaths() {
    return {
        fallback: false, // tells if my paths array contains all supported parameter(id) values (false) or just some of them
        // if the user try acces to m3 they will get a 404 error when is false,
        // if is true next will try to generate a page for the m3 meetup dynamically on the server
        // allows you to pregenerate some of ur pages for specific id values like the most pospular ones
        // and pregenerate the missing ones dynamically when request are coming in
        paths: [
            { //holds key value pairs that lead to dynamic pages even for dynamic segments

                params: {
                    meetupId: 'm1',
                }
            },
            { //holds key value pairs that lead to dynamic pages even for dynamic segments

                params: {
                    meetupId: 'm2',
                }
            }
        ]
    }

}
// This is a dynamic page, we need id, but cant use useRouter hook to get access to the router object and use a query property
// it is only used in a component function
export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                image: "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
                id: meetupId,
                title: "A First Meetup",
                address:'Some Address',
                description: 'Meet Up description',
            }
        }
    }
}

export default MeetUpDetails;