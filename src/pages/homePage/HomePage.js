import EventCard from '../../components/eventCard/EventCard';
import CookieNotice from '../../components/cookieNotice/CookieNotice';
import { useEffect, useState } from 'react';
import constants from '../../constants';
import './HomePage.css';

function _buildEventCards() {
  const assets = [{
    id: 1,
    title: "Noctambule #02 w/ Alëx Voiceless",
    location: "Le ferrailleur - Club Concert",
    dateTime: "15-10-2022 19:00",
    imageUrl: "/assets/evt_1.jpg"
  },
  {
    id: 2,
    title: "Carte Blanche à Chaleur Turnantes @Trempo",
    location: "Trempo",
    dateTime: "15-10-2022 21:00",
    imageUrl: "/assets/evt_2.jpg"
  },
  {
    id: 3,
    title: "Abstrack & The Balek Band (Live) invitent Wolf Müller & Niklas Wandt (live)",
    location: "Stereolux",
    dateTime: "19-10-2022 20:00",
    imageUrl: "/assets/evt_3.jpg"
  },
  {
    id: 4,
    title: "Battle Opsession • Festival Hip Opsession Danse 2023",
    location: "Le Lieu unique",
    dateTime: "18-02-2022 19:00",
    imageUrl: "/assets/evt_4.jpg"
  },
  {
    id: 5,
    title: "La Saperie - vide dressing, créateurs, expo, art & music",
    location: "Décadanse",
    dateTime: "14-10-2022 21:00",
    imageUrl: "/assets/evt_5.jpg"
  },
  {
    id: 6,
    title: "Jay & The Family Affair au Live Bar !",
    location: "Le Live Bar",
    dateTime: "16-10-2022 18:00",
    imageUrl: "/assets/evt_6.jpg"
  }]
  const cards = assets.map((asset) => <EventCard key={asset.id} data={asset} />);
  return (<>{cards}</>);
}

function HomePage() {

  const cookieAccepted = !!(localStorage.getItem(constants.lsCookieKey) 
      && localStorage.getItem(constants.lsCookieKey) === "True");

  const [cookieAcceptedState, setCookieAcceptedState] = useState(cookieAccepted);
  const [sticky, setSticky] = useState(false);
  const [heroPadding, setHeroPadding] = useState(0);

  let cookieNoticePos = null;
  let heroPos = null;
  let navbarHeight = null;
  let stickyTmp = false;

  const handleScroll = () => {
    const cookieAccepted = !!(localStorage.getItem(constants.lsCookieKey) 
      && localStorage.getItem(constants.lsCookieKey) === "True");

    if(cookieAccepted) {
      return;
    }

    const position = window.pageYOffset;
    if (!stickyTmp && position >= cookieNoticePos) {
      setSticky(true);
      setHeroPadding(heroPos - navbarHeight);
      stickyTmp = true;
    } else if (stickyTmp && position < cookieNoticePos) {
      setSticky(false);
      setHeroPadding(0);
      stickyTmp = false;
    }
  };

  const cookieCB = () => {
    localStorage.setItem(constants.lsCookieKey, "True");
    setSticky(false);
    setHeroPadding(0);
    setCookieAcceptedState(true);
    console.log("sticky", sticky);
  }

  const _buildCookieNotice = (sticky) => {
    if (cookieAcceptedState) {
      return;
    } else {
      return <CookieNotice sticky={sticky} cookieCB={cookieCB} />;
    }
  }

  useEffect(() => {
    const cookieAccepted = !!(localStorage.getItem(constants.lsCookieKey) 
      && localStorage.getItem(constants.lsCookieKey) === "True");
    if(cookieAccepted) {
      return;
    }
    
    cookieNoticePos = document.getElementById("cookie-notice")?.offsetTop;
    heroPos = document.getElementById("hero-custom")?.offsetTop;
    navbarHeight = document.getElementById("navbar")?.offsetHeight;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // need to change how heroPos is calculated to get good value
  return (
    <>
      {_buildCookieNotice(sticky)}
      <section id="hero-custom" style={{ paddingTop: !heroPadding ? 0 : heroPadding + "px" }}>
        <div className="hero-txt">
          <p className="title">
            Meet people with the same <strong>interests</strong> as yours
          </p>
          <p className="subtitle">
            Try now, for free.
          </p>
        </div>
        <div className="hero-img">
          <img src={process.env.PUBLIC_URL + '/assets/conversation_illu_2.png'} alt="a drawing with two characters having a conversation" />
        </div>
      </section>
      <section className="section landing-section">
        <div className="container">
          <div className='landing-assets-parent'>
            {_buildEventCards()}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
