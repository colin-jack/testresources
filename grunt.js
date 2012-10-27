module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffee: {
      app: {
        src: ['lib/coffee/*.coffee'],
        dest: 'lib/',
        options: {
            preserve_dirs: true
        }
      },
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-coffee');

  // Default task.
  //grunt.registerTask('default', 'grunt-coffee');


  // Default task.
  //grunt.registerTask('default', 'lint sample');

};