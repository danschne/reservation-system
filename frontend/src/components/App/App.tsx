import React, { BaseSyntheticEvent, createContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDarkModeOnFromLocalStorage } from '../../helpers/hooks';
import ReservationFeedback from '../ReservationFeedback/ReservationFeedback';
import ReservationForm from '../ReservationForm/ReservationForm';

const THEMES = {
  LIGHT: "primary",
  DARK: "dark",
};

const ThemeContext = createContext(THEMES.LIGHT);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {

  const [darkModeOn, setDarkModeOn] = useDarkModeOnFromLocalStorage();
  const [reservationWasSuccessful, setReservationWasSuccessful] = useState<boolean | null>(null);
  const theme = darkModeOn ? THEMES.DARK : THEMES.LIGHT;

  function toggleDarkMode(e: BaseSyntheticEvent): void {
    setDarkModeOn(e.currentTarget.checked as boolean);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Container className="mt-3">
        <Row>
          <Col lg={{ offset: 3, span: 6 }}>
            <Row className="text-right">
              <Col lg={{ offset: 8}}>
                Dark Mode
                <Form.Check type="switch" className="d-inline ml-2" id="darkModeSwitch"
                            checked={darkModeOn} onChange={toggleDarkMode} />
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

export { App as default, ThemeContext };
