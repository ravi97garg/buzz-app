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

const updateBuzz = (buzzId, buzzContent) => ({
    type: 'UPDATE_BUZZ',
    payload: {
        buzzId,
        buzzContent
    }
});

export const createBuzzAction = (buzz) => (dispatch) =>{
    console.log(`hell is here ${JSON.stringify(buzz)}`);
    dispatch(createBuzz(buzz));
};

export const initBuzzAction = (buzzs) => (dispatch) =>{
    dispatch(initBuzz(buzzs));
};

export const loadMoreBuzzAction = (extractedBuzzs) => (dispatch) =>{
    dispatch(addMoreBuzz(extractedBuzzs));
};

export const updateBuzzAction = (buzzId, buzzContent) => (dispatch) => {
    dispatch(updateBuzz(buzzId, buzzContent));
};