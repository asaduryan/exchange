import * as actionTypes from '../api'

const currencies = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENCIES:
      return {
        data: action.data.currencies,
      }
      case actionTypes.GET_CURRENCIES_FAIL:
      return {
       ...state
      }   
    default:
      return state;
  }
}

const markets = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_MARKETS:
      return {
        data: action.data.market,
      }
      case actionTypes.GET_MARKETS_FAIL:
      return {
       ...state
      }   
    default:
      return state;
  }
}

export { currencies, markets };