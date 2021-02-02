import logo from './logo.svg';
import './App.css';
import React, { useState } from "react"
import { Route, Link, Switch } from "react-router-dom";
import Display from './Display.js'
import Form from './Form'

function App() {
  const url = "http://localhost:4000"

  const [cookbooks, setCookbooks] = useState([]);

  const getCookbooks = () => {
    fetch(url + "/api/cookbooks/")
      .then((response) => response.json())
      .then((data) => {
        setCookbooks(data)
      })
  }

  const emptyCookbook = {
    title: "",
    yearPublished: 0,
  }

  const handleCreate = (newCookbook) => {
    fetch(url + "/api/cookbooks", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCookbook)
    })
    .then(() => {
      getCookbooks()
    })
  }

  const [selectedBook, setSelectedBook] = React.useState(emptyCookbook);

  const selectBook = (book) => {
    setSelectedBook(book)
  }

  const handleUpdate = (cookbook) =>{
    fetch(url + "/api/cookbooks/id/" + cookbook._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cookbook)
    })
    .then(() => {
      getCookbooks()
    })
  }

  const deleteCookbook = (book) => {
    fetch(url + "/api/cookbooks/title/" + book.title, {
      method: "delete"
    })
    .then(() => {
      getCookbooks()
    })
  }

  React.useEffect(() => getCookbooks(), []);
  return (
    <div className="App">
      <h1>Cookbooks</h1>
      {/* <Link to="/cookbooks">
        <button>View Cookbooks</button>
      </Link> */}
      <Link to="/create">
        <button>add cookbook</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} cookbooks={cookbooks} selectBook={selectBook} deleteCookbook={deleteCookbook}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" cookbook={emptyCookbook} handleSubmit={handleCreate} />
              
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" cookbooks={selectedBook} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
