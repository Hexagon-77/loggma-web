import React, { Component } from "react";
import SearchBox from "./SearchBox";
import axios from "axios";

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    customerList: [],
    item: {
      id: 0,
      first_name: "",
      last_name: "",
      tr_id: 0,
      phone: 0,
      city: "",
      district: 0,
    },
    pageVal: 1,
    searchFilter: "",
    lastPage: false,
  };
}

generateUrl = (url, params) => {
  var i = 0, key;
  for (key in params) {
      if (i === 0) {
          url += "?";
      } else {
          url += "&";
      }
      url += key;
      url += '=';
      url += params[key];
      i++;
  }
  return url;
}

refreshList = () => {
    axios
      .get("/api/customers/")
      .then((res) => this.setState({ customerList: res.data }))
      .catch((err) => console.log(err));
};

componentDidMount() {
  this.refreshList();
}

handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/customers/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post("/api/customers/", item)
      .then((res) => this.refreshList());
};

handleDelete = (item) => {
    alert("delete " + item.id);
    
    axios
      .delete("/api/customers/", item)
      .then((res) => this.refreshList());
};

changePage = (i) => {
  if (this.state.lastPage && i > 0) return;
  if (this.state.pageVal + i - 1 < 0) return;
  this.state.pageVal += i;

  if (i == 0) {
    this.state.pageVal = 1;
    this.state.searchFilter = "";
  }

  if (this.state.searchFilter) window.location = this.generateUrl("http://localhost:3000", {p: this.state.pageVal-1, s: this.state.searchFilter})
  else window.location = this.generateUrl("http://localhost:3000", {p: this.state.pageVal-1})
};

renderItems = () => {
    const { search } = window.location;
    var query = new URLSearchParams(search).get('s');
    var page = new URLSearchParams(search).get('p');
    if (page) this.state.pageVal = parseInt(page) + 1;

    var newItems = this.state.customerList;
    this.state.searchFilter = query;

    if (query != null) {
      query = query.toLowerCase();

      newItems = newItems.filter(i => 
        i.first_name.toLowerCase().includes(query) ||
        i.last_name.toLowerCase().includes(query) ||
        i.phone.toString().toLowerCase().includes(query) ||
        i.tr_id.toString().toLowerCase().includes(query) ||
        i.city.toLowerCase().includes(query) ||
        i.district.toString().toLowerCase().includes(query)
      );
    }

    newItems.sort((a, b) => b.id - a.id)

    const pagination = 25;
    var sliced = newItems.slice(pagination * page, pagination * page + pagination);
    if (sliced.includes(newItems[newItems.length - 1])) this.state.lastPage = true;
    newItems = sliced;
    
    return newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div><b>{item.id}</b></div>&emsp;
          {item.first_name} {item.last_name} <b>|</b> 🆔 {item.tr_id} <b>|</b> 📞 {item.phone} <b>|</b> 📍 {item.city}, {item.district}
        </div>
        <div>
          <button className="btn btn-secondary">Edit</button>&emsp;
          <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>Delete</button>
        </div>
      </li>
    ));
};

render() {
  return (
    <main className="container">
      <br></br>
        <h1>Customer View</h1>
        <SearchBox />
      <br></br><br></br>

      <ul className="list-group list-group-flush border-top-0">
        {this.renderItems()}
      </ul>

      <br></br><br></br>
        <button className="btn btn-primary" onClick={() => this.changePage(-1)}>⬅</button>&emsp;
        <button className="btn btn-primary" onClick={() => this.changePage(1)}>➡</button>&emsp;
        Page <b>{this.state.pageVal}</b>&emsp;
        <button className="btn btn-primary" onClick={() => this.changePage(0)}>⌂</button>
      <br></br><br></br>
    </main>
  ); }
}

export default App;