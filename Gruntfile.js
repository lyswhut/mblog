module.exports = function(grunt) {
  //加载插件
  [
    //'grunt-cafe-mocha',
    'grunt-contrib-jshint',

    //打包工具
    'grunt-contrib-less',
    'grunt-contrib-uglify',
    'grunt-contrib-cssmin',
    'grunt-hashres',

    'grunt-contrib-watch',

    //'grunt-lint-pattern',
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  //配置插件
  grunt.initConfig({
    // cafemocha: {
    //   all: {
    //     src: 'qa/tests-*.js',
    //     options: {
    //       ui: 'tdd'
    //     }
    //   }
    // },
    jshint: {
      app: ['server.js', 'public/js/**/*.js', 'lib/**/*.js'],
      //app: ['server.js', 'lib/**/*.js'],
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
    },


    less: {
      development: {
        options: {
          customFunctions: {
            static: function(lessObject, name) {
              return 'url("' + require('./lib/static.js').map(name.value) + '")';
            }
          }
        },
        files: {
          // 'public/vendor/bootstrap.css': 'less/bootstrap/bootstrap.less',
          'public/css/main.css': 'less/main.less',
          // 'public/css/cart.css': 'less/cart.less',
        }
      }
    },
    uglify: {
      all: {
        files: {
          'public/js/stsky.min.js': ['public/js/**/*.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/css/stsky.min.css': ['public/css/**/*.css', '!public/css/stsky*.css'],
          'public/vendor/bootstrap.min.css': 'public/vendor/bootstrap.css'
        }
      }
    },
    hashres: {
      options: {
        fileNameFormat: '${name}.${hash}.${ext}'
      },
      all: {
        src: [
          'public/js/stsky.min.js',
          'public/css/stsky.min.css',
          'public/vendor/bootstrap.min.css'
        ],
        dest: [
          'views/layout.pug',
        ]
      }
    },

    watch: {
      build: {
        files: ['less/**/*.less'],
        tasks: ['less',/*'cssmin', 'uglify'*/],
        options: { spawn: false}
      }
    },


    lint_pattern: {
      view_statics: {
        options: {
          rules: [{
            pattern: /<link [^>]*href=["'](?!\{\{static )/,
            message: 'Un-mapped static resource found in <link>.'
          }, {
            pattern: /<script [^>]*src=["'](?!\{\{static )/,
            message: 'Un-mapped static resource found in <script>.'
          }]
        },
        files: {
          src: [
            'views/**/*.handlebars'
          ]
        }
      },
      css_statics: {
        options: {
          rules: [{
            pattern: /url\(/,
            message: 'Un-mapped static found in LESS property.'
          }]
        },
        files: {
          src: [
            'less/**/*.less'
          ]
        }
      }
    }
  });

  //注册任务
  grunt.registerTask('default', [
    /*'cafemocha',*/ 'jshint', /*'exec',*/ /*'lint_pattern',*/
  ]);
  grunt.registerTask('static', [
    'less', 'uglify', 'cssmin', 'hashres'
  ]);
};