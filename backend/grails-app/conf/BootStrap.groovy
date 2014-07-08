import server.Task

class BootStrap {

    def init = { servletContext ->
        [1,2,3].each{
            Task.findOrSaveWhere(name: "Task $it")
        }
    }
    def destroy = {
    }
}
