import React, { BaseSyntheticEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  
  function adjustNumberOfPersons(e: BaseSyntheticEvent): void {
    setNumberOfPersons(e.currentTarget.value as number);
  }
  
  return (
    <Container>
      <Row>
        <Col lg={{ offset: 3, span: 6 }}>
          <Row>
            <Col>
              <h3 className="text-center">Reservierungssystem</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group as={Row} controlId="formReservationName">
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={undefined} required />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formReservationDate">
                  <Col>
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="date" value={undefined} required />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formReservationNumberOfPersons">
                  <Col>
                    <Form.Label>Anzahl Personen</Form.Label>
                    <Form.Control type="number" required min={1} max={12}
                                  value={numberOfPersons} onChange={adjustNumberOfPersons} />
                  </Col>
                </Form.Group>
                <Button type="submit" block>
                  Reservieren
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
