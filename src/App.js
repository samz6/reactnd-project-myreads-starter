import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "./App.css";
import Books from "./components/Books";
import Search from "./components/Search";
import { get, getAll, update } from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    getAll().then(res => {
      this.setState({
        books: [...res],
        currentlyReadingBooks: res.filter(
          book => book.shelf === "currentlyReading"
        ),
        wantToReadBooks: res.filter(book => book.shelf === "wantToRead"),
        readBooks: res.filter(book => book.shelf === "read")
      });
    });
  }

  shelfChangeHandler = (book, shelf) => {
    update(book, shelf).then(res => {
      console.log(res);
      getAll().then(res => {
        this.setState({
          books: [...res]
        });
      });
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <Books
                books={this.state.books}
                onShelfChange={this.shelfChangeHandler}
              />
            )}
          />
          <Route path="/search" component={Search} />
          <div className="open-search">
            <Link to="/search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </Link>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
