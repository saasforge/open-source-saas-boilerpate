import axios from 'axios';

var httpService = {
    init: function(){
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest'
            };
    },
    formFullUrl: function(rootUrl, entityUrl){
        var url = '';
        if (rootUrl && entityUrl){
            var delimiter = (rootUrl[rootUrl.length - 1] == '/' ? '' : '/');
            url = rootUrl + delimiter + entityUrl;
        }
        return url;
    },
    post: function (url, data) {
        return axios.post(url, data); 
    },
    get: function(url){
        return axios.get(url);
    },
    delete: function(url){
        return axios.delete(url);
    }
};
httpService.init();
export { httpService };