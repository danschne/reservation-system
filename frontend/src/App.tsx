import React, { BaseSyntheticEvent, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {

  const today = extractDateISOString(new Date());
  const oneYearFromToday = getDateISOStringOneYearFromToday();

  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [reservationWasSuccessful, setReservationWasSuccessful] = useState<boolean | null>(null);
  
  function adjustName(e: BaseSyntheticEvent): void {
    setName(e.currentTarget.value.trimStart());
  }

  function adjustDate(e: BaseSyntheticEvent): void {
    setDate(e.currentTarget.value);
  }

  function adjustNumberOfPersons(e: BaseSyntheticEvent): void {
    setNumberOfPersons(e.currentTarget.value as number);
  }

  async function makeReservation(e: BaseSyntheticEvent): Promise<void> {
    e.preventDefault();
    e.stopPropagation();

    const response = await fetch("https://localhost:5001/api/Reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name.trimEnd(),
        "date": date,
        "numberOfPersons": numberOfPersons,
      }),
    });

    if (response.status === 201) {
      setReservationWasSuccessful(true);
    } else if (response.status === 204) {
      setReservationWasSuccessful(false);
    }
  }
  
  return (
    <Container className="mt-3">
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
          {
            reservationWasSuccessful !== null &&
            <Row className="mt-3">
              <Col>
                {
                  reservationWasSuccessful ?
                  <Alert variant="success">Vielen Dank für Ihre Reservierung.</Alert> :
                  <Alert variant="danger">Für diese Daten ist leider kein Tisch mehr verfügbar.</Alert>
                }
              </Col>
            </Row>
          }
        </Col>
      </Row>
    </Container>
  );

}

function getDateISOStringOneYearFromToday(): string {
  const date = new Date();
  
  date.setFullYear(date.getFullYear() + 1);

  return extractDateISOString(date);
}

function extractDateISOString(date: Date): string {
  return date.toISOString().substr(0, 10);
}

export default App;
