import api from "./api"

export const ACTION_TYPES = { 
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    FETCH_ALL: 'FETCH_ALL',
    DELETE: 'DELETE',
}

const formatData = data => ({
    ...data, 
    age: parseInt(data.age? data.age : 0)
})


export const fetchAll = () => dispatch => {
    //GET api request to get all the records 
    api.dCandidate().fetchAll()
    .then(
        response => { 
            dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data
            })
        })
    .catch(error => console.log(error))

    
}
//POST api request to create new records 
export const create = (data, onSucces) => dispatch => { 
    data = formatData(data)
    api.dCandidate().create(data)
        .then( response => { 
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSucces()
        })
        .catch(error => console.log(error))
}

//UPDATE
export const update = (id, data, onSucces) => dispatch => { 
   data = formatData(data)
    api.dCandidate().update(id, data)
        .then( response => { 
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id, ...data}
            })
            onSucces()
        })
        .catch(error => console.log(error))
}

//DELETE
export const Delete = (id, onSucces) => dispatch => { 
    api.dCandidate().delete(id)
        .then( response => { 
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSucces()
        })
        .catch(error => console.log(error))
}