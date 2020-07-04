import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
  <tr>
    <td>
          <Link to={"/catalog/book/"+props.book._id}>{props.book.title}</Link>
    </td>
    <td>{props.book.author.name}</td>
    <td>
      <Link to={"/catalog/genre/edit/"+props.genre._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGenre(props.genre._id) }}>delete</a>
    </td>
  </tr>
)

export default class GenreDetail extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this)

    this.state = {books: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/catalog/genre/' +  this.props.match.params.id)
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBook(id) {
    axios.delete('http://localhost:5000/books/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })
  }

  bookList() {
    return this.state.books.map(currentbook => {
       console.log(currentbook.author);
      return <Book book={currentbook} deleteBook={this.deleteBook} key={currentbook._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Genre Books</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </table>
      </div>
    )
  }
}
