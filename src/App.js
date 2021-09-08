import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="formPanel">
        <Container className="p-3">
          <Nav>
            <Nav.Item className="logo">
              <img src='/images/lative-logo.png' alt='Lative Software' />
            </Nav.Item>
          </Nav>
          <h1 className="header">Growth Ranking of U.S. States</h1>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Form.Control as="select">
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Measure</Form.Label>
                  <Form.Control as="select">
                    <option>Household Income</option>
                    <option>Population</option>
                    <option>Property Value</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group>
                  <Form.Label>Growth Period</Form.Label>
                  <Form.Control as="select">
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>3 Years</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <div className="results">
        <Container>          
        </Container>
      </div>
    </div>
    );
}

export default App;
