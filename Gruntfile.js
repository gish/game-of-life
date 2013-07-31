module.exports = function(grunt)
{
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		qunit : {
			all : {
				options : {
					urls : ["http://game-of-life.dev/tests"]
				}
			}
		},
		watch : {
			files : ['tests/*.js', 'src/game-of-life.js'],
			tasks : ['qunit']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['qunit']);
};
