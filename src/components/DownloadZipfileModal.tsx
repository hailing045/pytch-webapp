import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useStoreActions, useStoreState } from "../store";
import { failIfNull, focusOrBlurFun, submitOnEnterKeyFun } from "../utils";
import { MaybeErrorOrSuccessReport } from "./MaybeErrorOrSuccessReport";

export const DownloadZipfileModal = () => {
  const {
    isActive,
    inputsReady,
    isInteractable,
    attemptSucceeded,
    maybeLastFailureMessage,
    filename,
    fileContents,
  } = useStoreState(
    (state) => state.userConfirmations.downloadZipfileInteraction
  );

  const { dismiss, attempt, setFilename, refreshInputsReady } = useStoreActions(
    (actions) => actions.userConfirmations.downloadZipfileInteraction
  );

  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  // It does no harm if this effect is called more often than strictly
  // necessary.
  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(focusOrBlurFun(inputRef, isActive, isInteractable));

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setFilename(value);
    refreshInputsReady();
  };

  const handleClose = () => dismiss();
  const handleDownload = () =>
    attempt({
      filename,
      data: failIfNull(
        fileContents,
        "cannot do download if file contents null"
      ),
    });

  const handleKeyPress = submitOnEnterKeyFun(handleDownload, inputsReady);

  const haveFileContents = fileContents != null;

  return (
    <Modal
      className="DownloadZipfile"
      show={isActive}
      onHide={handleClose}
      animation={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {haveFileContents ? "Download zipfile" : "Preparing zipfile..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="icon-container">
          {haveFileContents ? (
            <FontAwesomeIcon className="fa-5x" icon="file-archive" />
          ) : null}
          {!haveFileContents ? <Spinner animation="border" /> : null}
        </div>

        <Form>
          <Form.Control
            type="text"
            value={filename}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            tabIndex={-1}
            ref={inputRef}
          />
        </Form>

        <MaybeErrorOrSuccessReport
          messageWhenSuccess="Downloading!"
          attemptSucceeded={attemptSucceeded}
          maybeLastFailureMessage={maybeLastFailureMessage}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!isInteractable}
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          disabled={!(isInteractable && inputsReady)}
          variant="primary"
          onClick={handleDownload}
        >
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
