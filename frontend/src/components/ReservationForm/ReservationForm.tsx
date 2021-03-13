import React, { BaseSyntheticEvent, Dispatch, useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { extractDateISOString, getDateISOStringOneYearFromToday } from '../../helpers/helpers';
import { ThemeContext } from '../App/App';

type ReservationFormProps = {
  setReservationWasSuccessful: Dispatch<React.SetStateAction<boolean | null>>,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function ReservationForm({ setReservationWasSuccessful }: ReservationFormProps) {

  const today = extractDateISOString(new Date());
  const oneYearFromToday = getDateISOStringOneYearFromToday();
  const theme = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  // Remove and style dark mode differently.
  useEffect(() => console.log(theme), [theme]);

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
      <Button type="submit" block variant={theme}>Reservieren</Button>
    </Form>
  );

}

export default ReservationForm;
