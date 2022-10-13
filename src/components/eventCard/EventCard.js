import './EventCard.css';

export default function EventCard(props) {
    const asset = props.data
    return(
        <div className="card event-card">
            <div className="card-image">
                <figure className="image is-4by3">
                <img src={asset.imageUrl} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="card-title is-4">{asset.title}</p>
                        <p className="subtitle card-subtitle is-6">{asset.location}</p>
                    </div>
                </div>

                <div className="content">
                    <time dateTime="2016-1-1">{asset.dateTime}</time>
                </div>
            </div>
        </div>
    );
}