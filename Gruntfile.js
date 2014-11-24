module.exports = function (grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
        less: {
            development: {
                options: {
                    compress: true
                },
                files: {
                    "./public/assets/stylesheets/application.css": "./app/assets/stylesheets/application.less"
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            application: {
                src: [
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './app/assets/javascripts/**/*.js'
                ],
                dest: './public/assets/javascripts/application.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            application: {
                files: {
                    './public/assets/javascripts/application.js': './public/assets/javascripts/application.js'
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: './bower_components/bootstrap/fonts/',
                src: '**',
                dest: './public/assets/fonts/'
            }
        },
        phpunit: {
            classes: {},
            options: {}
        },
        watch: {
            application: {
                files: [
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './app/assets/javascripts/**/*.js'
                ],
                tasks: ['concat:application', 'uglify:application'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: ['./app/assets/stylesheets/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            tests: {
                files: ['app/controllers/*.php', 'app/models/*.php'],
                tasks: ['phpunit']
            }
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-phpunit');

    // Task definition
    grunt.registerTask('build', ['less', 'concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);

};