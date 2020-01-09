// Returns true of email is proper, else false
var AuthUIFunctions = {
    validateEmail: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    handleResponse: function(response, redirectUrl){
        if (response.data.redirect || redirectUrl){
            if (response.data.redirectDelay){
                setTimeout(function(){
                    window.location.href = response.data.redirect || redirectUrl;
                }, response.data.redirectDelay * 1000);
            } else {
                window.location.href = response.data.redirect || redirectUrl;
            }
        }
        if (!response.data.result){
            return [response.data.error || 'Something went wrong during login.'];
        }
        return []; // Errors list is empty.
    }
};
export { AuthUIFunctions };