import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

const StoryDetailPage = () => {
  const { id } = useParams(); // Get the id parameter from the URL

  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`https://child.onrender.com/api/sciencefiction/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          console.log('Fetched Story:', jsonData);
          setStory(jsonData);
        } else {
          throw new Error('Failed to fetch story');
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return <div>Loading...</div>;
  }
  const imageStyle = {
    objectFit: 'cover',
    height: '200px',
  };
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
  return (
    <>
    <div className="container-fluid d-flex flex-column align-items-center" style={{ minHeight: '100vh', backgroundColor: '#0E051F', color: 'white' }}>
      {/* Navbar */}
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
          <Nav className="ml-auto">
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
            <Nav.Link href="#signout">
              <button
                className="btn rounded-pill"
                style={{ backgroundColor: '#2ABCED', color: 'white', marginLeft: '10px' }}
              >
                Signout
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="my-2 my-lg-0">
        <h1 style={{ color: '#ffffff', textAlign:"center" }}>{story.Title}</h1>
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
      {/* Card */}
   
    <div  style={{ width:"100%", height:"fit-content", display:"flex", justifyContent:"start"}}>
    <div className="card text-center text-white p-4 mt-4" style={{width:"300px", backgroundColor:"#181830"}}>
      {story.Image && story.Image.length > 0 && (
          <Card.Img
            variant="top"
            src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
            alt={story.Title}
            style={imageStyle}
          />
        )}
        <h2 className="card-title">{story.Title}</h2>
        {/* <p className="card-text">Status: {story.Status}</p> */}
        <button
                  className="btn rounded-pill mx-auto"
                  style={{
                    backgroundColor: '#ffffff',
                    color: getStatusColor(story.Status),
                    marginRight: '10px',
                    width: '150px',
                
                  }}
                >
                  {story.Status}
                </button>
      </div>
    </div>
      
    </div>

      </>
  );
};

export default StoryDetailPage;
