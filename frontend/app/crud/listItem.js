function ListItem(item, objectName, Server){
    var self = this,
        objectKeys = item ? _.keys(item) : [];

    _.each(objectKeys, function(property){
        self[property] = item[property];
    });

    self.editing = false;
    self.edited = false;

    self.edit = function(){
        self.editing = true;
    };

    self.strip = function(){
        var serializedObject = {};

        _.each(objectKeys, function(key){
            var value = (self[key] === null || self[key] === undefined) ? '' : self[key];
            serializedObject[key] = value;
        });

        return serializedObject;
    };

    self.stopEditing = function(){
        var url = Server.createUrl(objectName, 'save', self.strip()),
            success = function(){
                self.edited = true;
                self.editing = false;
            },
            error = function(){
                console.log('do something smart');
            };

        Server.call(url, success, error);
    }
}