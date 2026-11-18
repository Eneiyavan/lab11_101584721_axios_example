import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';

export default class PersonList extends Component {
    // Define state default values
    state = {
        persons: []
    }

    // Component Lifecycle Callback
    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
        .then(res => {
            console.log(res.data);
            const persons = res.data.results;
            this.setState({ persons });
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    }

    render() {
        return (
            <div>
                {/* Top Green Header Bar matching the output screenshot */}
                <header className="bg-success text-white text-center py-3 mb-4">
                    <h1>User List</h1>
                </header>

                <Container>
                    {this.state.persons.map((person, index) => (
                        <Card 
                            key={index} 
                            className="mb-4 text-white shadow-sm" 
                            style={{ backgroundColor: '#17a2b8' }} // Teal card background matching the image
                        >
                            {/* Card Header showing Title, Name, and UUID */}
                            <Card.Header className="font-weight-bold">
                                {person.name.title} {person.name.first} {person.name.last} - {person.login.uuid}
                            </Card.Header>

                            <Card.Body>
                                <Row className="align-items-center">
                                    {/* Left Column: Avatar & Details Button */}
                                    <Col md={3} className="text-center mb-3 mb-md-0">
                                        <Image 
                                            src={person.picture.large} 
                                            roundedCircle 
                                            fluid 
                                            className="mb-3 border border-white"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        />
                                        <br />
                                        <Button variant="primary" size="sm" className="px-4">
                                            Details
                                        </Button>
                                    </Col>

                                    {/* Right Column: User Details Fields */}
                                    <Col md={9}>
                                        <p className="mb-1"><strong>User Name:</strong> {person.login.username}</p>
                                        <p className="mb-1"><strong>Gender:</strong> {person.gender.toUpperCase()}</p>
                                        <p className="mb-1"><strong>Time Zone Description:</strong> {person.location.timezone.description}</p>
                                        <p className="mb-1">
                                            <strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}
                                        </p>
                                        <p className="mb-1"><strong>Email:</strong> {person.email}</p>
                                        <p className="mb-1"><strong>Birth Date and Age:</strong> {person.dob.date} ({person.dob.age})</p>
                                        <p className="mb-1"><strong>Register Date:</strong> {person.registered.date}</p>
                                        <p className="mb-1"><strong>Phone#:</strong> {person.phone}</p>
                                        <p className="mb-1"><strong>Cell#:</strong> {person.cell}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            </div>
        );
    }
}