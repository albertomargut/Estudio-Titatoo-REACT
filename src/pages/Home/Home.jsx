import "./Home.css";

export const Home = () => {
  return (
    <>
      <div className="Home">
        <div className="TituloHome">
          <h1>TITATTOO STUDIO</h1>
          <br></br>
        </div>
        <div className="bloquesDiv">
          <div className="Bloque1">
            <div className="Mensaje1">
              Bienvenido a Titatoo Studio En Titattoo Studio, convertimos tus
              ideas en obras de arte duraderas. Somos más que un estudio de
              tatuajes; somos creadores de experiencias únicas.
              <br></br>
              <br></br>Nuestro equipo de artistas altamente talentosos está
              comprometido con la excelencia, fusionando creatividad y destreza
              para llevar tus visiones a la vida a través de tatuajes
              inigualables.
              <br></br>
              <br></br><b>Nuestra Filosofía: Arte, Pasión y Compromiso.</b>
              <br></br>
              <br></br> En Titatoo Studio, creemos en la expresión auténtica y
              en la importancia de cada historia personal.
            </div>

            <br></br>
            <img
              className="Imagen1"
              src="../../src/img/tattoo-shop.jpg"
              alt="ImagenStudio1"
            />
          </div>

          <div className="Bloque2">
            <div className="Mensaje2">
              Nuestros tatuadores no solo son expertos en la técnica, sino que
              también son apasionados por comprender tus ideas y transformarlas
              en obras de arte corporal significativas.
              <br></br>
              <br></br>Nos esforzamos por crear un ambiente acogedor donde la
              creativida fluya y las ideas tomen forma, para ello ofrecemos:
              <br></br>
              <br></br>
              - <u>Servicios Exclusivos Diseño Personalizado:</u> Trabajamos
              estrechamente contigo para diseñar tatuajes personalizados que
              reflejen tu individualidad y estilo único.
              <br></br>
              <br></br>
              - <u>Técnicas Innovadoras:</u> Desde tatuajes tradicionales hasta
              técnicas vanguardistas, ofrecemos una amplia gama de estilos para
              satisfacer tus preferencias.
              <br></br>
              <br></br>
              - <u>Ambiente Premium:</u> Nuestro estudio está diseñado para
              proporcionar comodidad y privacidad, asegurando una experiencia de
              tatuaje placentera y memorable.
              <br></br>
              <br></br>
              - <u>Compromiso con la Seguridad e Higiene:</u> La salud y
              seguridad de nuestros clientes son de suma importancia.
              <br></br>En Titatoo Studio, seguimos estrictos estándares de
              higiene y utilizamos equipos esterilizados para garantizar un
              entorno seguro y saludable.
              <br></br>
              <br></br>
            </div>
            <img
              className="Imagen2"
              src="../../src/img/artist.jpg"
              alt="ImagenEstudio2"
            />
            <br></br>
            <br></br>
            <br></br>
            <div className="Mensaje3">
              <b>Contacto: </b>
              <br></br>
              <u>Dirección:</u> C/Blasco de Garay, 62. Madrid (España)
              <br></br>
              <u>Teléfono:</u> 678824812
              <br></br>
              <u>Correo Electrónico:</u> info@titatoostudio.com
              <br></br>
              <b>
                <br></br>
                ¡Sigue tu pasión, expresa tu historia en la piel.
                <br></br>
                <br></br>¡Bienvenido a Titatoo Studio, donde cada tatuaje cuenta
                una historia única!.
              </b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
