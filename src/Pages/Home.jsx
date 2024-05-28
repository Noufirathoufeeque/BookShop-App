import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { getDetailsAPI, removeDetailsAPI } from '../Services/allAPI';
import { Row, Col, Card } from 'react-bootstrap';
import Add from '../Components/Add';

function Store() {
  const [allDetails, setAllDetails] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState("");
  const [editDetails, setEditDetails] = useState(null);

  useEffect(() => {
    getAllDetails();
  }, []);

  const getAllDetails = async () => {
    try {
      const result = await getDetailsAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllDetails(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveDetails = async (id) => {
    try {
      const result = await removeDetailsAPI(id);
      setDeleteResponse(result.data);
      getAllDetails();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      
      <div>
        <Add editDetails={editDetails} setEditDetails={setEditDetails} getAllDetails={getAllDetails} />
        <Row>
          {allDetails.length > 0 ? (
            allDetails.map(details => (
              <Col key={details?.id} className='mb-4' sm={12} md={6} lg={4}>
                <div className='m-5 shadow' style={{ background: 'grey' }} data-aos="fade-up"
                  data-aos-duration="3000">
                  <Card className='bg-dark p-3 rounded-3'>
                    <Card.Img height={'400px'}  variant="top" src={details?.cover_image_url} />
                    <Card.Body>
                      <Card.Title className='d-flex justify-content-between'>
                        <p className='text-light'>{details?.title.slice(0,14)}..</p>
                        <div>
                          <button onClick={() => setEditDetails(details)} className='btn'><i className='fa-solid fa-pen text-warning'></i></button>
                          <button onClick={() => handleRemoveDetails(details.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
                        </div>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))
          ) : (
            <div className='fw-bolder text-center text-danger ms-5 mb-5 mt-5 fs-bolder'>Nothing to display</div>
          )}
        </Row>
      </div>
    </>
  );
}

export default Store;