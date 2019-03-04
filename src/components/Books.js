import React, { Component } from "react";
import "../App.css";

class Books extends Component {
  authorHelper = book => {
    let authors = "";
    book.authors.forEach((element, index) => {
      if (index === 0) {
        authors = element;
      } else {
        authors = authors + ", " + element;
      }
    });
    return authors;
  };

  onChangeHandler = (book, e) => {
    const shelf = e.target.value;
    this.props.onShelfChange(book, shelf);
  };
  render() {
    const currentlyReadingBooks = this.props.books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = this.props.books.filter(
      book => book.shelf === "wantToRead"
    );
    const readBooks = this.props.books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks && currentlyReadingBooks.length > 0
                    ? currentlyReadingBooks.map(currentlyReadingBook => {
                        return (
                          <li key={currentlyReadingBook.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      currentlyReadingBook.imageLinks.thumbnail
                                    })`
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select
                                    value={currentlyReadingBook.shelf}
                                    onChange={this.onChangeHandler.bind(
                                      this,
                                      currentlyReadingBook
                                    )}
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">
                                {currentlyReadingBook.title}
                              </div>
                              <div className="book-authors">
                                {this.authorHelper(currentlyReadingBook)}
                              </div>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks && wantToReadBooks.length > 0
                    ? wantToReadBooks.map(wantToReadBook => {
                        return (
                          <li key={wantToReadBook.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      wantToReadBook.imageLinks.thumbnail
                                    })`
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select
                                    value={wantToReadBook.shelf}
                                    onChange={this.onChangeHandler.bind(
                                      this,
                                      wantToReadBook
                                    )}
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">
                                {wantToReadBook.title}
                              </div>
                              <div className="book-authors">
                                {this.authorHelper(wantToReadBook)}
                              </div>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks && readBooks.length > 0
                    ? readBooks.map(readBook => {
                        return (
                          <li key={readBook.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      readBook.imageLinks.thumbnail
                                    })`
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select
                                    value={readBook.shelf}
                                    onChange={this.onChangeHandler.bind(
                                      this,
                                      readBook
                                    )}
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{readBook.title}</div>
                              <div className="book-authors">
                                {this.authorHelper(readBook)}
                              </div>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
