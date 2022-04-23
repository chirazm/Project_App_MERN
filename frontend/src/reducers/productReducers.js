import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_RESQUEST, 
    PRODUCT_LIST_SUCCESS } 
from "../constants/productConstant";

export const productListReducer = (state = {products: []}, action)=>{
    switch(action.type) {
        case PRODUCT_LIST_RESQUEST : 
            return {loading: true};
        case PRODUCT_LIST_SUCCESS : 
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL : 
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}