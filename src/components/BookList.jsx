import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row, Container } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedAsin: null,
  };

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  bookClick = (asin) => {
    this.setState({ selectedAsin: asin });
  };
  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={4} className="text-center">
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={this.state.searchQuery}
                  onChange={() => this.handleSearch()}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Row className="g-2 mt-3">
                {this.props.books
                  .filter((b) =>
                    b.title.toLowerCase().includes(this.state.searchQuery)
                  )
                  .map((b) => (
                    <Col xs={12} md={4} key={b.asin}>
                      <SingleBook book={b} onBookClick={this.bookClick} />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col md={6}>
              <CommentArea asin={this.state.selectedAsin} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BookList;
