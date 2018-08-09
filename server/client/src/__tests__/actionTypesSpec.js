import {GET_CURRENT_USER, GET_CURRENT_ARTICLE, UPDATE_CURRENT_ARTICLE, SAVE_ARTICLE} from '../actions/actionTypes'; 

describe('Action constants', () => {
    it('GET_CURRENT_USER const has the correct val', () => {
        expect(GET_CURRENT_USER).toEqual("get_current_user"); 
    })

    it('GET_CURRENT_ARTICLE has the correct val', () => {
        expect(GET_CURRENT_ARTICLE).toEqual("get_current_article");
    })

    it('UPDATE_CURRENT_ARTICLE has the correct val', () => {
        expect(UPDATE_CURRENT_ARTICLE).toEqual("update_current_article");
    })
    
    it('SAVE_ARTICLE has the correct val', () => {
        expect(SAVE_ARTICLE).toEqual("save_article");
    })
})