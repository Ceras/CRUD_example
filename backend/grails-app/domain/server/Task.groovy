package server

import grails.rest.*

@Resource(uri='/tasks', formats=['json'])
class Task {

    String name
    String description

    static constraints = {
        description nullable: true
    }
}
