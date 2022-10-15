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
  },
  {
  id: 4,
  title: "Radio Event of the year",
  location: "44 Tours",
  dateTime: "12-10-2022 19:00",
  imageUrl: "https://cdn.pixabay.com/photo/2022/10/08/09/19/winter-7506621_960_720.jpg"
},
{
  id: 5,
  title: "DJ set by Ddd ipsum",
  location: "Le Ferrailleur",
  dateTime: "14-10-2022 21:00",
  imageUrl: "https://cdn.pixabay.com/photo/2022/08/16/00/56/building-7389074_960_720.jpg"
},
{
  id: 6,
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
    <>
    <section className="hero hero-custom is-medium">
      <div className="hero-body">
        <p className="title">
        Meet people with the same <strong>interests</strong> as yours
        </p>
        <p className="subtitle">
        Try now, for free.
        </p>
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
