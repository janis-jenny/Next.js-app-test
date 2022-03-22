import NewMeetupForm from "../../components/meetups/NewMeetUpForm";
import { useRouter } from 'next/router';
// my-domain.com/new-meetup

function NewMeetUpPage() {
    const router = useRouter();
    async function addMeetUpHandler(enteredData) {
        // insert the url to we want to send a request, here is the internal api that is hosted 
        //by the same server as being use for serving the page, this will trigger the handler from the api w this path
        // send a POST request w the 2nd argument
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData), //this is a js object with the data we want to store in the db
            headers: { 'Content-Type': 'application/json'}
        });
        const data = response.json();
        console.log(data);
        router.push('/') //replace is for not get back w the back btn
    }
    return <NewMeetupForm onAddMeetup={addMeetUpHandler} /> 
    // No () here cause it is gonna be execurted in props function at NewMeetupForm when user submit the form
}

export default NewMeetUpPage;