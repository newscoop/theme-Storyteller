module.exports = function(grunt) {

    grunt.initConfig({
        pkg: require('./package.json')
    });

    grunt.loadTasks('grunt-tasks');
    require('load-grunt-tasks')(grunt);



    grunt.registerTask('dev', ['watch']);

    grunt.registerTask('build', ['less:build', 'autoprefixer:build', 'concat', 'regex-replace:build']);
};