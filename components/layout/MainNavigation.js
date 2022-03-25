import Link from 'next/link';
import classes from './MainNavigation.module.css';

// Links from next allows to stay in a single page app and preserve state accross pages and give a better user experience when navigating
// where we never send a http request behind the scenes for a new page or load a new page or whithout losing any app-state we stored like happens when using 'a' tags
// refresh loader doesnt show w Links, it prevents the browser of sending a request & getting a new page
// Links automatically prefetches any data of the page we might navigate too as soons as we hover over them.
// replace prop allows to no push the new page on the stack history but replace the current page with it so we cant go back
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

// another way to set up long endpoints for links:

// <Link href={{
//  pathName: '/clients/[id]/[clientprojectid]',
//  query: {
//    id: client.id , clientprojectid: client.project
//  },
// }}>{client.name}<Link/>