import EventCard from '../../components/eventCard/EventCard';
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
  const cards = assets.map((asset) => <EventCard key={asset.id} data={asset}/>);
  return(<>{cards}</>);
}

function HomePage() {

  return (
    <>
    <section className="hero-custom">
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
    <section className="section">
    <div className="container landing-container">
      <div className='landing-assets-parent'>
        {_buildEventCards()} 
      </div> 
    </div>
  </section>
  </>
  );
}

export default HomePage;
