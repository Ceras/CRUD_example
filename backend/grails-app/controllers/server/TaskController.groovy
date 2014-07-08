package server

import grails.converters.JSON
import grails.rest.RestfulController

class TaskController extends RestfulController {

    TaskController(){
        super(Task)
    }
    def index() {
        def jsonResponse = Task.list()
        if (params.callback) {
            jsonResponse = "${params.callback}(${jsonResponse as JSON})"
        }

        render text:jsonResponse, contentType: 'text/javascript', encoding: "UTF-8"
    }
}
