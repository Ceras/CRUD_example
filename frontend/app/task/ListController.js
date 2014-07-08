/* global app */
app.controller('ListController', function(){
    this.crudListConfig = {
        order: ['id', 'name', 'description'],
        columns: {
            id: {
                label: 'Id',
                width: '30px'
            },
            name: {
                label: 'Name',
                width: '100px'

            },
            description: {
                label: 'Description'
            }
        }
    };
});