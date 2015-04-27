module.exports = function(grunt){

  grunt.config('regex-replace',{


    build: {
      src: ['_tpl/_html-head.tpl'],
              actions: [
                  {
                      name: 'var_env',
                      search: '{{ assign var="VER_ENV" value="[^\']*" scope="global" }}',
                      replace: function(result){

                        var newVer = new Date().getTime();

                        return '{{ assign var="VER_ENV" value="'+newVer+'" scope="global" }}';
                      },
                      flags: 'i'
                  }
              ]
    }

  });

};