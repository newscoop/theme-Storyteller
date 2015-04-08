module.exports = function(grunt){

  grunt.config('less',{

    dev: {
      files: { 'assets/css/style.css': 'assets/css/style.less' }
    },

    build: {
      options: {
        compress: true
      },
      files: { 'assets/css/style.css': 'assets/css/style.less' }
    }

  });


};