import Layout from '../components/layout/Layout';
import '../styles/globals.css'
// This acts as the root component Next will render
// Helps to avoid wrapping our layout in each page content
function MyApp({ Component, pageProps }) {
  return (
            <Layout>
              <Head>
                <title>React Meetups</title>
                <meta
                  name='description'
                  content='Meetup Events'
                />
                <meta
                  name='viewport'
                  content='initial-scale=1.0, width=device-width'
                /> 
                {/* ensures the page is responsive and scales correctly in all the pages */}
              </Head>
              <Component {...pageProps} />
            </Layout>
          ) // Component is a prop that hold the page content that should be rendered,
  // so it will be different whenever we switched the page
  // pageProps are specific props that pages might be getting
  // Component will be the actual page content of our different pages and it will change when you navigate to page a or b
}

export default MyApp;
