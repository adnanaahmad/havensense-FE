export const catchAsync = fn => {
    return (...args) => {
        fn(...args).catch( error => {
            alert(error.response ? JSON.stringify( error.response.data) : JSON.stringify(error.response));
            console.log(error.response ? error.response.data : error.response);
        });
    };
}