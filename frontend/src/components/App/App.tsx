import React, { createContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import ReservationFeedback from '../ReservationFeedback/ReservationFeedback';
import ReservationForm from '../ReservationForm/ReservationForm';

const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const ThemeContext = createContext(THEMES.LIGHT);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {

  // Theme as state in local storage => bundle functionality in custom hook.
  const [reservationWasSuccessful, setReservationWasSuccessful] = useState<boolean | null>(null);
  
  return (
    <ThemeContext.Provider value={THEMES.LIGHT}>
      <Container className="mt-3">
        <Row>
          <Col lg={{ offset: 3, span: 6 }}>
            <Row className="text-right">
              <Col lg={{ offset: 8}}>
                Dark Mode
                <Form.Check type="switch" className="d-inline ml-2"
                            checked={undefined} onChange={undefined} />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <h3 className="text-center">Reservierungssystem</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <ReservationForm setReservationWasSuccessful={setReservationWasSuccessful} />
              </Col>
            </Row>
            <ReservationFeedback reservationWasSuccessful={reservationWasSuccessful} />
          </Col>
        </Row>
      </Container>
    </ThemeContext.Provider>
  );

}

export default App;
