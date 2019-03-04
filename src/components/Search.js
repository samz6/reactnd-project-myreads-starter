import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

import { search } from "../BooksAPI";

class Search extends Component {
  state = {
    books: []
  };

  authorHelper = book => {
    let authors = "";
    if (book.authors) {
      book.authors.forEach((element, index) => {
        if (index === 0) {
          authors = element;
        } else {
          authors = authors + ", " + element;
        }
      });
    }
    return authors;
  };

  changeHandler = e => {
    search(e.target.value)
      .then(res => {
        if (res && res.length > 0) {
          this.setState({ books: [...res] });
        } else if (res.error) {
          console.log(res.error);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { books } = this.state;
    console.log(books);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.changeHandler(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books && books.length > 0
              ? books.map(book => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              defaultValue="none"
                              onChange={e => console.log(e)}
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                          {this.authorHelper(book)}
                        </div>
                      </div>
                    </li>
                  );
                })
              : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
