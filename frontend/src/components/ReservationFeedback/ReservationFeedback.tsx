import React from "react";
import { Alert, Col, Row } from "react-bootstrap";

type ReservationFeedbackProps = {
  reservationWasSuccessful: boolean | null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function ReservationFeedback({ reservationWasSuccessful }: ReservationFeedbackProps) {

  if (reservationWasSuccessful === null) {
    return null;
  }
  return (
    <Row className="mt-3">
      <Col>
        {
          reservationWasSuccessful ?
          <Alert variant="success">Vielen Dank für Ihre Reservierung.</Alert> :
          <Alert variant="danger">Für diese Daten ist leider kein Tisch mehr verfügbar.</Alert>
        }
      </Col>
    </Row>
  );

}

export default ReservationFeedback;
