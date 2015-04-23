

 module.exports = function(grunt){

     grunt.config('uglify',{

         options : {
            sourceMap : true,
            sourceMapIncludeSources : true,
            sourceMapIn : 'assets/js/dist/all.js.map'
          },
          build : {
            src  : '<%= concat.all.dest %>',
            dest : 'assets/js/dist/all.js'
          }


     });

 };