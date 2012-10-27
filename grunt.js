module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffee: {
      app: {
        src: ['coffee/**/*.coffee'],
        dest: 'lib/',
        options: {
            preserve_dirs: true,
            base_path: 'coffee'
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