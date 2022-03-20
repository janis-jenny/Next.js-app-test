import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

//wraps page content
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;