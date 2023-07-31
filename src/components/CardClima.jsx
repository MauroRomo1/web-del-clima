import { Col, Row } from "react-bootstrap";

const CardClima = ({ ubicacion, imgIcons }) => {
  return (
    <Row className="justify-content-center my-5">
      <Col
        className="text-center text-white shadow p-2 rounded bg-clima"
        xs={11}
        md={9}
        lg={6}
      >
        <h6 className="text-white mt-3">
          El clima en {ubicacion.nombreCiudad}, {ubicacion.inicialesPais}
        </h6>
        <img
          src={
            imgIcons[`${ubicacion.iconoClima}`]
              ? imgIcons[`${ubicacion.iconoClima}`]
              : `https://openweathermap.org/img/wn/${ubicacion.iconoClima}@2x.png`
          }
          alt={ubicacion.iconoDescripcion}
          className="d-flex mx-auto img-fluid iconClima"
        />
        <h1>{ubicacion.temperatura} °C</h1>
        <p>Max: {ubicacion.temperaturaMax} °C</p>
        <p>Min: {ubicacion.temperaturaMin} °C</p>
      </Col>
    </Row>
  );
};

export default CardClima;
