// Returns true of email is proper, else false
var AuthUIFunctions = {
    validateEmail: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    handleResponse: function(response){
        var errors = [];
        if (response && response.data){
            for (var key in response.data.errors){
                errors = errors.concat(response.data.errors[key]);
            }
            if (response.data.redirect){
                window.location.href = response.data.redirect;
            }
        }
        return errors;
    }
};
export { AuthUIFunctions };