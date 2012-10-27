module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        coffee: {
            app: {
                src: ['coffee/*.coffee'],
                dest: 'lib/',
                options: {
                    preserve_dirs: true,
                    base_path: 'coffee'
                }
            },

            spec: {
                src: ['spec_coffee/**/*.coffee'],
                dest: 'spec',
                options: {
                    preserve_dirs: true,
                    base_path: 'spec_coffee'
                }
            },

        },

        watch: {
            files: '**/*.coffee',
            tasks: 'coffee'
        }
    });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-coffee');
};