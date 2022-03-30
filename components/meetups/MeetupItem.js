import { useRouter } from 'next/router';
import Image from 'next/image';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {

  const router = useRouter();

  function showDetailsHandler() { // handler to navigate programatically
    // router.query -> query is a property that give access to all the data of the url for a dynamic page 
    // for navigating programatically there is a push method from useRouter, that pushes a new page onto the stack of pages
    // it's the equivalent of using the Link component //you can also pass an object w pathName and query object to navigate like Links
    router.push('/' + props.id); // add dynamic path
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.content}>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
