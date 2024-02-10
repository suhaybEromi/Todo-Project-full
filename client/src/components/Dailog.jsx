import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/**
 * Dailog
 *
 * @param {Object} props - component props
 * @param {Boolean} props.show - is Dailog shown?
 * @param {React.ReactNode} props.header - Dailog header
 * @param {React.ReactNode} props.body - Dailog body
 * @param {Object} props.closeButton - Dailog close button
 * @param {Boolean} props.closeButton.show - is close button shown?
 * @param {Boolean} props.closeButton.text - close button text
 * @param {Function} props.onClose - Dailog close handler
 * @param {Object} [props.acceptButton] - Dailog accept button
 * @param {Boolean} [props.acceptButton.show] - is accept button shown?
 * @param {Boolean} [props.acceptButton.text] - accept button text
 * @param {Boolean} [props.acceptButton.onAccept] - accept button handler
 *
 * @returns Dailog component
 */

export default function Dialog({
  show,
  header,
  body,
  closeButton,
  onClose,
  acceptButton,
}) {
  closeButton = { text: "Close", show: true, ...closeButton };
  acceptButton = {
    text: "Accept",
    show: false,
    onAccept: () => {},
    ...acceptButton,
  };

  // Update the state to control modal visibility
  const [showState, setShowState] = useState(show);

  const handleClose = () => {
    setShowState(false);
    onClose();
  };

  useEffect(() => {
    setShowState(show);
  }, [show]);

  return (
    <div>
      <Modal size="lg" show={showState} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {acceptButton.show && (
            <Button
              variant="success"
              onClick={() => {
                handleClose();
                acceptButton.onAccept();
              }}
            >
              {acceptButton.text}
            </Button>
          )}
          {closeButton.show && (
            <Button variant="danger" onClick={handleClose}>
              {closeButton.text}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
