import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg',
    address: 'Some Address',
    description: 'This is a first meetup'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg',
    address: 'Some Address',
    description: 'This is a first meetup'
  }
]

export default function Home() {
  return (
    <MeetupList meetups={DUMMY_MEETUPS}/>   
  )
}
