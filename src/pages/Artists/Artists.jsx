import { useEffect, useState } from "react";
import { getArtists } from "../../services/apiCalls";
import * as React from "react";
import "./Artists.css";
import Avatar from "@mui/material/Avatar";


export const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (artists.length === 0) {
      getArtists().then((data) => {
        setArtists(data);
      });
    }
  }, []);

  return (
    <>
      <h1 className="artist-team">CONOCE A LOS MEJORES TATUADORES</h1>
      <div className="artist-container">
        {artists && artists.length > 0 ? (
          artists.map((artist) => {
            return (
              <div key={artists.id} className="artist-card">
                <div className="artist-info">
                  <Avatar
                    alt={artist.user.first_name}
                    src={`/static/images/avatar/${String(artist.id)}.jpg`}
                    className="avatar"
                  />
                  <p className="artist-name">
                    {artist.user.first_name} {artist.user.last_name}
                  </p>
                  <p className="artist-style">Estilo: {artist.tattoo_style}</p>
                  <p className="artist-experience">
                    Años de experiencia: {artist.work_experience}
                  </p>
                  <p className="artist-phone">
                    Contacto: {artist.user.phone_number}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="error-artist">
            Lo siento, no hemos encontrado a tu artista.
          </p>
        )}
      </div>
    </>
  );
};
