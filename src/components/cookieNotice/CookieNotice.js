import './CookieNotice.css';
export default function CookieNotice() {
    const cookieSentencePart1 = "This website or its third-party tools use cookies, wich are necessary for its functioning"
    + "and required to achieve the purposes illustrated in the cookie policy.";
    
    const cookieSentencePart2 = "You accept the use of cookies or dismissing this notice, by scrolling this page,"
    + "by clicking a link or button or by continuing to browse otherwise.";

    return(
        <div className="p-6 has-background-light is-rounded">
          <h4 className="mb-2 is-size-5 has-text-weight-bold">Cookie Policy</h4>
          <p className="mb-4 has-text-grey-dark">We use cookies to personalise content, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners. If you want to change your cookie setting, please see the ‘how to reject cookies' section of our . Otherwise, if you agree to our use of cookies, please continue to use our website.</p>
          <a className="button is-link mr-2" href="#">Allow</a><a className="button is-outlined is-danger" href="#">Decline</a>
        </div>
    );
}