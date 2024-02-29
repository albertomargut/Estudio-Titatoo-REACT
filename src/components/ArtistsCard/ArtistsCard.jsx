import "./ArtistsCard.css"

export const ArtistsCard = ({id, image, name}) => {

    return (
        <div className="character-card" key={id}>
          <div className="card-content">
            <img className="character-img" src={image}></img>
            <h2 id="character-name">{name}</h2>
          </div>
        </div>
      );
}