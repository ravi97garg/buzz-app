const createBuzz = (buzz) => ({
    type: 'CREATE_BUZZ',
    payload: buzz
});

const initBuzz = (buzzs) => ({
    type: 'INIT_BUZZ',
    payload: buzzs
});

const addMoreBuzz = (buzzs) => ({
    type: 'PUSH_BUZZ',
    payload: buzzs
});

export const createBuzzAction = (buzz) => (dispatch) =>{
    console.log(`hell is here ${JSON.stringify(buzz)}`);
    dispatch(createBuzz(buzz));
};

export const initBuzzAction = (extractedBuzzs) => (dispatch) =>{
    dispatch(initBuzz(extractedBuzzs));
};

export const loadMoreBuzzAction = (extractedBuzzs) => (dispatch) =>{
    dispatch(addMoreBuzz(extractedBuzzs));
};