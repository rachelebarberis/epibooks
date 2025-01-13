import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row, Container } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    BookData: {},
  };

  getBookData = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          BookData: data.asin,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
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
                  value={this.props.searchQuery}
                  onChange={(e) => this.props.changeApp(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Row className="g-2 mt-3">
                {this.props.books
                  .filter((b) =>
                    b.title.toLowerCase().includes(this.props.searchQuery)
                  )
                  .map((b) => (
                    <Col xs={12} md={4} key={b.asin}>
                      <SingleBook book={b} />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col md={6}>
              <CommentArea
                searchQuery={this.props.searchQuery}
                BookData={this.state.BookData}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BookList;
