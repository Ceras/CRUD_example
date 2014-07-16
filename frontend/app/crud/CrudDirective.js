/* global app */
app.directive('crudList', function(Server){
    var getColumnConfig = function(scope){
        var config = scope.listConfig(),
            columns = {};

        _.each(scope.objectKeys, function(key){
            var columnConfigExists = (config !== undefined && config.columns[key] !== undefined),
                column = columnConfigExists ? config.columns[key] : {};

            columns[key] = {};

            columns[key].label = columnConfigExists && column['label'] !== undefined ? column['label'] : key;
            columns[key].width = columnConfigExists && column['width'] !== undefined  ? column['width']: null;
        });

        return columns;
    };

    var getOrderConfig = function(scope){
        var config = scope.listConfig(),
            order = [],
            objectKeys = scope.objects[0] ? _.keys(scope.objects[0]) : [];

        if(config && config.order){
            order = _.filter(config.order, function(property){
                return _.contains(objectKeys, property)
            })
        } else {
            order = objectKeys
        }

        return order
    };

    var buildListConfig = function(scope){
        scope.listConfig = {
            order: getOrderConfig(scope),
            columns: getColumnConfig(scope)
        };
    };

    var getAndBindObjects = function(scope){
        var url = Server.createUrl(scope.objectName),
            success = function(xhr){

                scope.objects = _.map(xhr.data, function(item){
                    return new ListItem(item, scope.objectName, Server);
                });
                scope.objectKeys = _.keys(scope.objects ? scope.objects[0] : {});

                buildListConfig(scope);
            },
            failure = function(){console.log('fail')};

        Server.call(
            url,
            success,
            failure

        );
    };
    var prepareCrud = function(scope){
        getAndBindObjects(scope);
    };


    return {
        restrict: 'E',
        scope: {
            objectName: '@',
            listConfig: '&listConfig'
        },
        templateUrl: '/crud/list.html',
        link: prepareCrud
    };
}).directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });