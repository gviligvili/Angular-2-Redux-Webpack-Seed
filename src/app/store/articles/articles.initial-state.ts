/**
 * Created by talgvili on 24/12/2016.
 */
var Immutable = require('immutable')

export const ARTICLES_INITIAL_STATE = Immutable.fromJS(
    {
        pending: false,
        error: false,
        articles: {}
    }
)