module.exports = function(grunt){

    grunt.config('watch',{
        css: {
            files: ['assets/css/**/*.less'],
            tasks: ['less:dev', 'autoprefixer:dev'],
            options: {
                spawn: false
            }
        },
        scripts: {
            files: ['assets/js/**/*.js'],
            tasks: ['concat'],
            options: {
                spawn: false,
            }
        }

    });
};