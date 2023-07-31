import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const FormClima = () => {
  const [formValue, setFormValue] = useState({
    ciudad: "",
    pais: "",
  });

  const [ubicacion, setUbicacion] = useState({
    nombreCiudad: "",
    inicialesPais: "",
    temperatura: "",
    temperaturaMin: "",
    temperaturaMax: "",
    iconoClima: "",
    iconoDescripcion: "",
  });

  const imgIcons = {
    "01d":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20with%20Face.png",
    "01n":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/New%20Moon%20Face.png",
    "02d":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20Behind%20Cloud.png",
    "03d":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud.png",
    "03n":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud.png",
    "10d":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20Behind%20Rain%20Cloud.png",
    "11d":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud%20with%20Lightning.png",
    "11n":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud%20with%20Lightning.png",
    "13d":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Snowflake.png",
    "13n":
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Snowflake.png",
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValue.ciudad.trim() === "" || formValue.pais.trim() === "") {
      console.warn("Debes de llenar todos los campos");
    } else {
      fetchClima(formValue.ciudad, formValue.pais);
      console.log(ubicacion);
    }
  };

  useEffect(() => {
    fetchClima();
    console.log(ubicacion);
  }, []);

  const fetchClima = async (ciudad = "tucuman", pais = "argentina") => {
    const keyAPI = "f88da05e873e48f037279aea8bb7d78b";
    try {
      const repuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${keyAPI}`
      );

      const data = await repuesta.json();

      if (data.cod === "404") {
        console.log("Ciudad no encontrada");
      } else {
        const {
          name,
          main: { temp, temp_min, temp_max },
          weather: [arr],
          sys: { country },
        } = data;
        setUbicacion({
          nombreCiudad: name,
          inicialesPais: country,
          temperatura: parseInt(temp - 273.15),
          temperaturaMin: parseInt(temp_min - 273.15),
          temperaturaMax: parseInt(temp_max - 273.15),
          iconoClima: arr.icon,
          iconoDescripcion: arr.description,
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container my-4">
      <h6 className="text-center mb-3">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Americas.png"
          alt="Globe Showing Americas"
          className="iconGlobehowingAmericas"
        />
        Consulta el clima del lugar que quieras
      </h6>

      <Row className=" justify-content-center">
        <Col md={10} lg={8}>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Pais">
                  <Form.Control
                    type="text"
                    name="pais"
                    value={formValue.pais}
                    onChange={handleChange}
                    placeholder="Argentina"
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Ciudad">
                  <Form.Control
                    type="text"
                    name="ciudad"
                    value={formValue.ciudad}
                    onChange={handleChange}
                    placeholder="Tucumán"
                  />
                </FloatingLabel>
              </Col>
              <Button variant="primary" type="submit">
                Buscar
                <FontAwesomeIcon
                  className="mx-2"
                  icon={faMagnifyingGlass}
                  size="lg"
                />
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>

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
    </section>
  );
};

export default FormClima;
