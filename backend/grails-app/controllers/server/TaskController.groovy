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

    def save(Long id) {
        Task task = Task.get(id)
        if(task){
            task.properties = params

            if (task.save(flush:true)){
                def jsonResponse = task
                if (params.callback) {
                    jsonResponse = "${params.callback}(${jsonResponse as JSON})"
                }

                render text:jsonResponse, contentType: 'text/javascript', encoding: "UTF-8"
            }
        }

        render status: 400, contentType: 'text/javascript', encoding: "UTF-8"
    }
}
