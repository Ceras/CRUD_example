/* global app */
app.constant("config", {
    "appName": "CRUD example",
    "environment": "Development",
    "urlBackend": "http://localhost:8080/server/",
    "version": "0.0.0"
});

app.factory('Server', function($http, config){
    return {
        createUrl: function(objectName, params){
            var paramsString = '';
            _.map(params, function(value, serverProperty){
                paramsString += '&' + serverProperty + '=' + value;
            });
            return config.urlBackend +objectName + 's' + '?callback=JSON_CALLBACK' + paramsString;
        },
        call: function(url2, success, error){
            $http.jsonp(url2).then(success, error)
        }
    };
});
