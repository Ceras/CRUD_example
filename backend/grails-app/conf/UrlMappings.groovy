class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/tasks"(resources: 'task')
        "/"(view:"/index")
        "500"(view:'/error')
	}
}
