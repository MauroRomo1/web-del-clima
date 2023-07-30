import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const FormClima = () => {
  const [formValue, setFormValue] = useState({
    ciudad: "",
    pais: "",
  });

  const [ubicacion, setUbicacion] = useState({});

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
        setUbicacion(data);
        console.log(ubicacion);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container my-4">
      <h5 className="text-center mb-3">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Americas.png"
          alt="Globe Showing Americas"
          className="iconGlobehowingAmericas"
        />
        Consulta el clima del lugar que quieras
      </h5>

      <Row className=" justify-content-center">
        <Col md={8}>
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
      <h2>{ubicacion.name}</h2>
    </section>
  );
};

export default FormClima;
