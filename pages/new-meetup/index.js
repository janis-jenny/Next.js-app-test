import NewMeetupForm from "../../components/meetups/NewMeetUpForm";

// my-domain.com/new-meetup

function NewMeetUpPage() {
    function addMeetUpHandler(enteredData) {
        console.log(enteredData)
    }

    return <NewMeetupForm onAddMeetup={addMeetUpHandler} /> 
    // No () here cause it is gonna be execurted in props function at NewMeetupForm when user submit the form
}

export default NewMeetUpPage;