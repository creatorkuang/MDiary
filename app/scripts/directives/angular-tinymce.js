/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('jizhiApp')
  .directive('uiTinymce',['$window', function ($window) {
    //uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        $.ajax({
			  url: 'components/vendors/tinymce/tinymce.min.js',
			  dataType: "script",
			  success: function(){
			  	 var expression, options, tinyInstance,
			 
		          updateView = function () {
		            ngModel.$setViewValue(elm.val());
		            if (!scope.$$phase) {
		              scope.$apply();
		            }
		          };
		        // generate an ID if not present
		        if (!attrs.id) {
		          attrs.$set('id', 'uiTinymce' + generatedIds++);
		        }

		        if (attrs.uiTinymce) {
		          expression = scope.$eval(attrs.uiTinymce);
		        } else {
		          expression = {};
		        }
		        options = {
		          // Update model when calling setContent (such as from the source editor popup)
		          setup: function (ed) {
		            var args;
		            ed.on('init', function(args) {
		              ngModel.$render();
		            });
		            // Update model on button click
		            ed.on('ExecCommand', function (e) {
		              ed.save();
		              updateView();
		            });
		            // Update model on keypress
		            ed.on('KeyUp', function (e) {
		              ed.save();
		              updateView();
		            });
		            // Update model on change, i.e. copy/pasted text, plugins altering content
		            ed.on('SetContent', function (e) {
		              if(!e.initial){
		                ed.save();
		                updateView();
		              }
		            });
		            if (expression.setup) {
		              scope.$eval(expression.setup);
		              delete expression.setup;
		            }
		          },
		          mode: 'exact',
		          elements: attrs.id
		        };
			  		  // extend options with initial uiTinymceConfig and options from directive attribute value
			        angular.extend(options, expression);
			        setTimeout(function () {
			         $window.tinymce.dom.Event.domLoaded = true;
			         tinymce.baseURL="/components/vendors/tinymce";
			          tinymce.init(options);
			        });


			        ngModel.$render = function() {
			          if (!tinyInstance) {
			            tinyInstance = tinymce.get(attrs.id);
			          }
			          if (tinyInstance) {
			            tinyInstance.setContent(ngModel.$viewValue || '');
			          }
			        };
			  }
			});
      
      }
    };
  }]);
