import './EventCard.css';
// espace, new line and other special characters
const regex = /[\n\r\s"'*$#~:;,?!]/;

function parseText(text, limit) {
    if(text.length > limit) {
        text = text.substring(0, limit - 3);
        if(text.charAt(text.length -1).match(regex)) {
            text = text.substring(0, text.length - 1);
        }
        text += "...";
    }
    return text;
}

export default function EventCard(props) {
    let asset = props.data
    
    const parsedTitle = parseText(asset.title, 50);
    const parsedLocation = parseText(asset.location, 50);
    asset.title = parsedTitle;
    asset.location = parsedLocation;

    return(
        <div className="card event-card landing-assets-child">
            <div className="card-image">
                <figure className="image is-16by9">
                <img src={process.env.PUBLIC_URL + asset.imageUrl} alt="Placeholder image" />
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