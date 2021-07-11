import { Container, Row } from 'react-bootstrap';
import { Header, Products, Categories, Cart } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Categories />
            <Products />
            <Cart />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
