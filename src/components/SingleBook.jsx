import { Component } from "react";
import { Card } from "react-bootstrap";
//import CommentArea from './CommentArea'

class SingleBook extends Component {
  state = {
    selected: false,
  };
  handleClick = () => {
    // Usa this.props.onBookClick per chiamare la funzione passata da BookList
    this.props.onBookClick(this.props.book.asin);
    // Puoi anche gestire lo stato 'selected' qui se vuoi evidenziare il libro selezionato
    this.setState({ selected: !this.state.selected });
  };
  render() {
    return (
      <>
        <Card
          onClick={this.handleClick}
          style={{ border: this.state.selected ? "3px solid red" : "none" }}
        >
          <Card.Img variant="top" src={this.props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: "black" }}>
              {this.props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SingleBook;
