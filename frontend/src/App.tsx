import React, { BaseSyntheticEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {

  const today = extractDateISOString(new Date());
  const oneYearFromToday = getDateOneYearFromToday();

  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  
  function adjustName(e: BaseSyntheticEvent): void {
    setName(e.currentTarget.value);
  }

  function adjustDate(e: BaseSyntheticEvent): void {
    setDate(e.currentTarget.value);
  }

  function adjustNumberOfPersons(e: BaseSyntheticEvent): void {
    setNumberOfPersons(e.currentTarget.value as number);
  }

  function makeReservation(e: BaseSyntheticEvent): void {
    e.preventDefault();
    e.stopPropagation();

    // make request to backend and show result
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
              <Form onSubmit={makeReservation}>
                <Form.Group as={Row} controlId="formReservationName">
                  <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required
                                  value={name} onChange={adjustName} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formReservationDate">
                  <Col>
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="date" required min={today} max={oneYearFromToday}
                                  value={date} onChange={adjustDate} />
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

function getDateOneYearFromToday(): string {
  const date = new Date();
  
  date.setFullYear(date.getFullYear() + 1);

  return extractDateISOString(date);
}

function extractDateISOString(date: Date): string {
  return date.toISOString().substr(0, 10);
}

export default App;
