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
    },

    watch: {
      files: '<config:coffee.app.src>',
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-coffee');
};