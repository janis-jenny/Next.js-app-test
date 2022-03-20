import Link from 'next/link';
import classes from './MainNavigation.module.css';

// Links from next allows to stay in a single page app and preserve state accross pages and give a better user experience when navigating
// where we never send a request for a new page or load a new page or to lose state we stored
// refresh icon doesnt show w Links, it prevents the browser of sending a request & getting a new page
function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;