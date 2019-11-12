// This is how we handle response with JWT token

import axios from 'axios';

var JWTFunctions = {
    handleLoginResponse: function(response){
        if (response && response.data){
            if (!response.data.result){
                return ([response.data.error || 'Something went wrong during login.']);
            }
            var token = sessionStorage.getItem('auth_token');
            if (token){
                // Check if it should be refreshed
                var expire_date = sessionStorage.getItem('expire_date');
                if (expire_date){
                    var now = new Date().now;
                    if (expire_date < now || now - expire_date*1000 < 5000){
                        // Ask for a new
                    }
                }
            } else {
                // Store token in Session storage
                sessionStorage.setItem('auth_token', response.data.access_token);

                // Add header to axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            }


            // If a response has a redirect we use it
            if (response.data.redirect){
                window.location.href = response.data.redirect;
            }
            return [];
        }
    }
};
export { JWTFunctions };