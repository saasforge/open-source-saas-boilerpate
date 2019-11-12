// Returns true of email is proper, else false
var AuthUIFunctions = {
    validateEmail: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    handleResponse: function(response){
        if (!response.data.result){
            return [response.data.error || 'Something went wrong during login.'];
        }
        if (response.data.redirect){
            window.location.href = response.data.redirect;
        }
        return []; // Errors list is empty.
    }
};
export { AuthUIFunctions };