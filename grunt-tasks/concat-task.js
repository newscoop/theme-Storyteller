module.exports = function(grunt){

    grunt.config('concat',{

        vendor: {
            src: ['assets/js/vendor/**/*.js'],
            dest: 'assets/js/dist/vendor.js',
        },
        custom: {
            src: ['assets/js/*.js'],
            dest: 'assets/js/dist/scripts.js',
        },

    });

};