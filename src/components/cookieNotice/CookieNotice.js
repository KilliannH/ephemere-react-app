import './CookieNotice.css';
var classNames = require('classnames');

export default function CookieNotice({sticky, cookieCB}) {

  let cookieNoticeClass = classNames({
    'p-5': true,
    'has-background-light': true,
    'sticky': sticky
  });

    const cookieSentencePart1 = "This website or its third-party tools use cookies, wich are necessary for its functioning"
    + "and required to achieve the purposes illustrated in the cookie policy.";
    
    const cookieSentencePart2 = "You accept the use of cookies or dismissing this notice, by scrolling this page,"
    + "by clicking a link or button or by continuing to browse otherwise.";

    return(
        <div id="cookie-notice" className={cookieNoticeClass}>
          <div className="level">
            <div className='level-left'>
              <h4 className="is-size-5 has-text-weight-bold">Cookie Policy</h4>    
            </div>
            <div className="level-right">
            <button className="delete" onClick={() => cookieCB()}></button>
            </div>
          </div>
          <p className="mb-5 has-text-grey-dark">We use cookies to personalise content, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners. If you want to change your cookie setting, please see the ‘how to reject cookies' section of our . Otherwise, if you agree to our use of cookies, please continue to use our website.</p>
          <button className="button is-info mr-2" onClick={() => cookieCB()}>Allow</button><button className="button is-outlined is-danger" onClick={() => cookieCB()}>Decline</button>
        </div>
    );
}