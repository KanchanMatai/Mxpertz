import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const cardStyle = {
    width: '18rem',
    margin: '10px',
    flex: '1 0 18rem',
    backgroundImage: 'linear-gradient(to right, #592CC0, #229CCC)',
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginLeft: '20px',
    marginTop: '10px',
  };

  const [data, setData] = useState(null);
  const apiUrl = 'https://child.onrender.com/api/sciencefiction';
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const jsonData = await response.json();
          console.log('Fetched Data:', jsonData);
          setData(jsonData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status) => {
    if (!status) {
      return '#000000';
    }

    const lowerCaseStatus = status.toLowerCase();

    switch (lowerCaseStatus) {
      case 'new':
        return '#2ABCED';
      case 'in progress':
        return '#FFFF00';
      case 'completed':
        return '#008000';
      default:
        return '#000000';
    }
  };

  const imageStyle = {
    objectFit: 'cover', // Ensure the image covers the entire space of the Card.Img container
    height: '200px', // Set a fixed height for consistency
  };

  const handleCardClick = (id) => {
    navigate(`/storyDetailPage/${id}`); // Navigate programmatically to StoryDetailPage
  };

  return (
    <div className="App" style={{ backgroundColor: '#0E051F', height: '100vh' }}>
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/011/883/287/small/modern-letter-c-colorful-logo-with-watter-drop-good-for-technology-logo-company-logo-dummy-logo-bussiness-logo-free-vector.jpg"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ marginLeft: '20px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto justify-content-center">
            <Nav.Link href="/home" style={{ color: 'white' }}>
              Home
            </Nav.Link>
            <Nav.Link href="#link" style={{ color: 'white' }}>
              Leaderboard
            </Nav.Link>
            <Nav.Link href="#link" style={{ color: 'white' }}>
              Daily Quiz
            </Nav.Link>
            <Nav.Link href="#link" style={{ color: '#226A97' }}>
              Genre
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#signout">
              <button
                className="btn rounded-pill"
                style={{ backgroundColor: '#2ABCED', color: 'white' }}
              >
                Signout
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="my-2 my-lg-0">
        <h1 style={{ color: '#ffffff' }}>Science Fiction Stories</h1>
        <div className="justify-content-center mt-5">
          <button
            className="btn rounded-pill"
            style={{
              backgroundColor: '#1D87FF',
              color: 'white',
              marginRight: '20px',
              width: '150px',
            }}
          >
            New
          </button>
          <button
            className="btn rounded-pill"
            style={{
              backgroundColor: '#FFBE1A',
              color: 'white',
              marginRight: '20px',
              width: '150px',
            }}
          >
            In Progress
          </button>
          <button
            className="btn rounded-pill"
            style={{
              backgroundColor: '#1CFF5E',
              color: 'white',
              marginRight: '20px',
              width: '150px',
            }}
          >
            Completed
          </button>
          <button
            className="btn rounded-pill"
            style={{
              backgroundColor: '#29C0EA',
              color: 'white',
              marginRight: '20px',
              width: '150px',
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      <div style={containerStyle}>
        {data.map((item) => (
          <div key={item._id} onClick={() => handleCardClick(item._id)} style={{ cursor: 'pointer' }}>
            <Card style={cardStyle}>
              {item.Image && item.Image.length > 0 && (
                <Card.Img
                  variant="top"
                  src={`https://ik.imagekit.io/dev24/${item.Image[0]}`}
                  alt={item.Title}
                  style={imageStyle}
                //   onError={(e) => {
                //     e.target.src = placeholderImage; // Fallback to placeholder image if load fails
                //   }}
                />
              )}
              <Card.Body>
                <Card.Title>{item.Title}</Card.Title>
                <button
                  className="btn rounded-pill"
                  style={{
                    backgroundColor: '#ffffff',
                    color: getStatusColor(item.Status),
                    marginRight: '10px',
                    width: '150px',
                  }}
                >
                  {item.Status}
                </button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
