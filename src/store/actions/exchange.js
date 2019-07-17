import * as actionTypes from "../api";
import axios from 'axios';

export const storeCurrencies = (data) => {
  return {
    type: actionTypes.GET_CURRENCIES,
    data
  }
}

export const storeCurrenciesFail = () => {
  return {
    type: actionTypes.GET_CURRENCIES_FAIL
  }
}

export const storeMarkets = (data) => {
  return {
    type: actionTypes.GET_MARKETS,
    data
  }
}

export const storeMarketsFail = () => {
  return {
    type: actionTypes.GET_MARKETS_FAIL
  }
}

export const getCurrencies = (actionId) => {
  return dispatch => {
    axios.get("https://exchange-test-app.herokuapp.com/currencies")
      .then(res => {
        dispatch(storeCurrencies(res.data, actionId))
      })
      .catch(error => {
        dispatch(storeCurrenciesFail())
      })
  }
}

export const getMarkets = (actionId) => {
  return dispatch => {
    axios.get("https://exchange-test-app.herokuapp.com/market")
      .then(res => {
        dispatch(storeMarkets(res.data, actionId))
      })
      .catch(error => {
        dispatch(storeMarketsFail())
      })
  }
}