import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import ApiService from '../classes/api-service';

const createApiService = (getState) => {
    const baseUrl = getState().app.city.slug || 'krasnoyarsk';
    return new ApiService(baseUrl);
};

const composeEnhancers = composeWithDevTools({
    trace: true,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(createApiService))));

// eslint-disable-next-line no-shadow
store.dispatch(() => (dispatch, getState, createApiService) => dispatch(createApiService(getState)));

export default store;
