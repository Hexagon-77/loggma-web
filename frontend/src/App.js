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
  };
}

refreshList() {
    axios
      .get("/api/customers/")
      .then((res) => this.setState({ customerList: res.data }))
      .catch((err) => console.log(err));
};

componentDidMount() {
  this.refreshList();
}

handleSubmit(item) {
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

handleDelete(item) {
    axios
      .delete(`/api/customers/${item.id}/`)
      .then((res) => this.refreshList());
};

renderItems = () => {
    var newItems = this.state.customerList;

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s').toLowerCase();
    if (query) newItems = newItems.filter(i => 
      i.first_name.toLowerCase().includes(query) ||
      i.last_name.toLowerCase().includes(query) ||
      i.phone.toString().toLowerCase().includes(query) ||
      i.tr_id.toString().toLowerCase().includes(query) ||
      i.city.toLowerCase().includes(query) ||
      i.district.toString().toLowerCase().includes(query)
    );

    newItems.sort((a, b) => b.id - a.id)
  
    return newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div><b>{item.id}</b></div>&emsp;
          {item.first_name} {item.last_name} | 🆔 {item.tr_id} | 📞 {item.phone} | 📍 {item.city}, {item.district}
        </div>
        <div>
          <button className="btn btn-secondary">Edit</button>&emsp;
          <button className="btn btn-danger" onClick={this.handleDelete(item)}>Delete</button>
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
    </main>
  ); }
}

export default App;