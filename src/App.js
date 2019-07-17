import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencies, getMarkets } from "./store/actions";
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import ReactTable from "react-table";
import _ from 'lodash'
import "react-table/react-table.css";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  state = {
    activeTab: localStorage.getItem('tab') ? localStorage.getItem('tab') : "1",
    favorites: JSON.parse(localStorage.getItem('favorites')) ? JSON.parse(localStorage.getItem('favorites')) : []
  }
  componentDidMount() {
    this.props.getCurrencies()
    this.props.getMarkets()
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      }, () => { localStorage.setItem('tab', tab) });
    }
  }
  filterAll(currencies, markets) {
    let data = []
    if (currencies && markets) {
      markets.map((item, i) => {
        let currenciesItem = _.find(currencies, { 'currencyId': item.fromCurrencyId })
        return data.push({ ...item, ...currenciesItem })
      })
    }
    return data
  }
  filterAllByFavorites(currencies, markets) {
    const { favorites } = this.state;
    let filteredData = []
    if (currencies && markets) {
      let data = this.filterAll(currencies, markets)
      favorites && favorites.map((item, i) => {
        let filtered = _.find(data, { 'currencyId': item })
        return filteredData.push(filtered)
      })
    }
    return filteredData
  }
  toggleFavorites = id => {
    const favorites = this.state.favorites || [];
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id), 1)
    } else {
      favorites.push(id);
    }
    this.setState({
      favorites
    }, () => localStorage.setItem('favorites', JSON.stringify(favorites))
    )
  }
  render() {
    const { currencies, markets } = this.props;
    return (
      <div className="App">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              USD
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Favorites
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ReactTable
              data={this.filterAll(currencies, markets)}
              showPagination={false}
              defaultPageSize={10}
              columns={[
                {
                  Header: "Favorites",
                  accessor: "currencyId",
                  Cell: row => (row.value && this.state.favorites.includes(row.value)) ? <i onClick={() => this.toggleFavorites(row.value)} className='fas fa-star'></i> : <i onClick={() => this.toggleFavorites(row.value)} className='far fa-star'></i>
                },
                {
                  Header: "currency",
                  accessor: "currency"
                },
                {
                  Header: "currencyName",
                  accessor: "currencyName"
                },
                {
                  Header: "volume",
                  accessor: "volume"
                },
                {
                  Header: "price",
                  accessor: "price"
                },
              ]}
              defaultSorted={[
                {
                  id: "price",
                  desc: false
                }
              ]}
              className="-striped -highlight"
            />
          </TabPane>
          <TabPane tabId="2">
            <ReactTable
              data={this.filterAllByFavorites(currencies, markets)}
              showPagination={false}
              defaultPageSize={10}
              columns={[
                {
                  Header: "Favorites",
                  accessor: "currencyId",
                  Cell: row => (row.value && this.state.favorites.includes(row.value)) ? <i onClick={() => this.toggleFavorites(row.value)} className='fas fa-star'></i> : <i onClick={() => this.toggleFavorites(row.value)} className='far fa-star'></i>
                },
                {
                  Header: "currency",
                  accessor: "currency"
                },
                {
                  Header: "currencyName",
                  accessor: "currencyName"
                },
                {
                  Header: "volume",
                  accessor: "volume"
                },
                {
                  Header: "price",
                  accessor: "price"
                },
              ]}
              defaultSorted={[
                {
                  id: "price",
                  desc: false
                }
              ]}
              className="-striped -highlight"
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currencies: state.currencies.data,
    markets: state.markets.data,
  }
}

export default connect(mapStateToProps, { getCurrencies, getMarkets })(App);