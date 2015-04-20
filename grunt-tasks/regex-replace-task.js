module.exports = function(grunt){

  grunt.config('regex-replace',{


    build: {
      src: ['_tpl/_html-head.tpl'],
              actions: [
                  {
                      name: 'var_env',
                      search: '{{ assign var="VER_ENV" value="[^\']*" scope="global" }}',
                      replace: function(result){
                        var ver = result.match(/(\d\.?)+/gi);
                        var newVer = parseFloat(ver) + 0.01;

                        return '{{ assign var="VER_ENV" value="'+newVer+'" scope="global" }}';
                      },
                      flags: 'i'
                  }
              ]
    }

  });

};