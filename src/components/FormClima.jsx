import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const FormClima = () => {
  const [formValue, setFormValue] = useState({
    pais: "",
    ciudad: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
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
        </Col>
      </Row>
    </section>
  );
};

export default FormClima;
