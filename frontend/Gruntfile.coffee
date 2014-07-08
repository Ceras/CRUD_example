module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-clean')


  grunt.initConfig
    clean:
      dist:
        src: ['dist']
      temp:
        src: ['dist/tmp']

    less:
      development:
        files:
          "app/css/main.css": "app/less/main.less"
          "app/css/crud/list.css": "app/less/crud/list.less"

    concat:
      css:
        src: [
          'app/components/bootstrap/css/bootstrap.css'
          'app/css/main.css'
        ],
        dest: 'dist/temp.main.css'

    connect:
      options:
        livereload: 35729
        port: 9000,
        hostname: 'localhost'
      development:
        options:
          base: ['app']

    watch:
      development:
        options:
          livereload: true
        files: ['app/**/*.html', 'app/**/*.js', 'app/less/*.less', 'app/less/**/*.less', '!app/components/**/*', '!app/config.js']
        tasks: ['less']


  grunt.registerTask(
    'build',
    'Processes source files and copies the files to the build directory',
    ['clean:dist', 'less'])

  grunt.registerTask(
    'server',
    'Starts a development server and watches for changes',
    ['less:development', 'connect:development', 'watch:development']
  )