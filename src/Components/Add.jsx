import React, { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { addDetailsAPI, updateDetailsAPI } from '../Services/allAPI';

function Add({ editDetails, setEditDetails, getAllDetails }) {
  const [storyDetails, setStoryDetails] = useState({ title: "", author: "", cover_image_url: "" });
  const [addStoryResponse, setAddStoryResponse] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditDetails(null);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (editDetails) {
      setStoryDetails(editDetails);
      handleShow();
    }
  }, [editDetails]);

  useEffect(() => {
    if (addStoryResponse) {
      getAllDetails();
    }
  }, [addStoryResponse, getAllDetails]);

  const handleUpload = async () => {
    if (storyDetails.title && storyDetails.author && storyDetails.cover_image_url) {
      try {
        const result = editDetails ? await updateDetailsAPI(storyDetails.id, storyDetails) : await addDetailsAPI(storyDetails);
        if (result.status >= 200 && result.status < 300) {
          setAddStoryResponse(result.data);
          setStoryDetails({ title: "", author: "",cover_image_url: "" });
          handleClose();
          alert(editDetails ? "Book details updated!" : "Book added to your collection!");
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completely");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mt-5 ms-5">
        <h5>{editDetails ? "Edit Book" : "Upload New Book"}</h5>
        <button onClick={handleShow} className='btn btn-success ms-3 rounded-3  text-light fw-bolder fs-5'>+</button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='bg-dark text-light'>{editDetails ? "Edit Book Details" : "Book Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-light'>
          <p>Please fill the following details !!</p>
          <div className='border rounded p-3'>
            <FloatingLabel controlId="floatingInputTitle" label="Book Title" className="mb-3">
              <Form.Control
                style={{ color: 'black' }}
                value={storyDetails.title}
                onChange={e => setStoryDetails({ ...storyDetails, title: e.target.value })}
                type="text"
                placeholder="Book Title"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInputAuthor" label="Author" className="mb-3">
              <Form.Control
                style={{ color: 'black' }}
                value={storyDetails.author}
                onChange={e => setStoryDetails({ ...storyDetails, author: e.target.value })}
                type="text"
                placeholder="Author"
              />
            </FloatingLabel>
            
            <FloatingLabel controlId="floatingInputImage" label="Cover Image" className="mb-3">
              <Form.Control
                style={{ color: 'black' }}
                value={storyDetails.cover_image_url}
                onChange={e => setStoryDetails({ ...storyDetails, cover_image_url: e.target.value })}
                type="text"
                placeholder="Cover Image"
              />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="btn btn-info">
            {editDetails ? "Update" : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;