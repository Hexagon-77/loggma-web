import React, { Component } from "react";
import SearchBox from "./SearchBox";
import Modal from "./Modal";
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
    modal: false,
    activeItem: 0,
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
    if (!!item.first_name && !!item.last_name
        && item.tr_id !== null && !!item.city && item.district !== null) {
          console.log(item.tr_id);
        if (item.tr_id > 999999 || item.tr_id < 100000
           || this.state.customerList.some(e => e.tr_id === item.tr_id && e.id != item.id)) {
          alert("Turkish ID invalid!");
          return;
        }
          
        if (this.state.customerList.some(e => e.id === item.id)) {
          axios
            .put(`/api/customers/${item.id}/`, item)
            .then((res) => this.refreshList());
        } else {
          axios
            .post("/api/customers/", item)
            .then((res) => this.refreshList());
        }
        
        this.setState({modal: false});
    }
    else alert("All fields are required.");
};  

handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete customer #" + item.id + "?")) {
      axios
        .delete(`/api/customers/${item.id}/`)
        .then((res) => this.refreshList());
    }
};

handleEdit = (item) => {
  this.state.activeItem = item;

  this.setState({modal: !this.state.modal});
}

handleAdd = () => {
  var nid = this.state.customerList.length;
  while (this.state.customerList.some(e => e.id === nid))
    nid++;

  const item = { id: nid, first_name: null, last_name: null, tr_id: null, phone: null, city: null, district: null};

  this.setState({activeItem: item, modal: !this.state.modal});
}

handleCancel = () => {
  this.setState({modal: false});
}

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

    // Search filter
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

    // Sorting
    newItems.sort((a, b) => b.id - a.id)

    // Pagination
    const pagination = 5;
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
          <button className="btn btn-secondary" title="Edit customer" onClick={() => this.handleEdit(item)}>Edit</button>&emsp;
          <button className="btn btn-danger" title="Delete customer" onClick={() => this.handleDelete(item)}>Delete</button>
        </div>
      </li>
    ));
};

render() {
  return (
    <main className="container">
      <br></br>
        <h1>Customer View</h1>
        <SearchBox/>
      <br></br><br></br>

      <ul className="list-group list-group-flush border-top-0">
        {this.renderItems()}
      </ul>

      <br></br><br></br>
        <button className="btn btn-primary" title="Previous page" onClick={() => this.changePage(-1)}>⬅</button>&emsp;
        <button className="btn btn-primary" title="Next page" onClick={() => this.changePage(1)}>➡</button>&emsp;
        Page <b>{this.state.pageVal}</b>&emsp;
        <button className="btn btn-primary" title="Home" onClick={() => this.changePage(0)}>▲</button>&emsp;
        <button className="btn btn-secondary" title="Add customer" onClick={() => this.handleAdd()}>Add</button>
      <br></br><br></br>

      {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            onExit={() => this.setState({modal: false})}
            onSave={(item) => this.handleSubmit(item)}
          />
        ) : null}
    </main>
  ); }
}

export default App;