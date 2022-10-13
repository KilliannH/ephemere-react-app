import EventCard from '../../components/eventCard/EventCard';
import './HomePage.css';

function _buildEventCards() {
  const assets = [{
    id: 1,
    title: "Radio Event of the year",
    location: "44 Tours",
    dateTime: "12-10-2022 19:00",
    imageUrl: "https://cdn.pixabay.com/photo/2022/10/08/09/19/winter-7506621_960_720.jpg"
  },
  {
    id: 2,
    title: "DJ set by Ddd ipsum",
    location: "Le Ferrailleur",
    dateTime: "14-10-2022 21:00",
    imageUrl: "https://cdn.pixabay.com/photo/2022/08/16/00/56/building-7389074_960_720.jpg"
  },
  {
    id: 3,
    title: "Impro allucinant au florida",
    location: "Le Florida",
    dateTime: "14-10-2022 20:00",
    imageUrl: "https://cdn.pixabay.com/photo/2022/10/04/23/33/mountains-7499281_960_720.jpg"
  }]
  const cards = assets.map((asset) => <EventCard key={asset.id} data={asset}/>);
  return(<>{cards}</>);
}

function HomePage() {

  return (
    <section className="section">
    <div className="container landing-container">
      <div className="hero-wrapper">
        <h1 className="title landing-title">
          Meet people with the same <strong>interests</strong> as yours
        </h1>
        <p className="subtitle landing-subtitle">
          Try it now, for free.
        </p>
      </div>
      <hr />
      <div className='landing-assets'>
        {_buildEventCards()} 
      </div> 
    </div>
  </section>
  );
}

export default HomePage;
