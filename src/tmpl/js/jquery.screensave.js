/**
 * @Author		Marko Zabreznik
 * @copyright	Marko Zabreznik
 * @license		http://www.gnu.org/licenses/gpl-3.0.html GNU/GPL
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

(function($){
	$.fn.ScreenSave = function(options) {
		var app = {
			init : function(options){
				// merge options
				$.extend(app, options);
				// append the screen saver
				$('body').append('<div class="screensave"></div>');
				// attach the listeners
				$('body').bind('mousemove', app.reset);
				$('body').bind('click', app.reset);
				$(window).bind('resize', app.reset);
				// the screen
				app.screen = $('div.screensave');
				app.wait *=1000;
				app.delay *=1000;
				// start
				app.load();
				app.reset();
			},
			reset : function(){
				// stop the screen saver
				app.screen.hide();
				clearTimeout(app.timer);
				clearTimeout(app.rollTimer);
				// start new timer
				app.timer = setTimeout(app.show, parseInt(app.wait));
			},
			load : function(){
				$.each(app.urls, function(index, value){
					//console.log("Screensave adding "+app.folder+value);
					app.screen.append('<img src="'+app.folder+value+'" />');
				});
				app.images = $('img', app.screen);
			},
			show : function(){
				// width/height
				app.screenw = $(window).width();
				app.screenh = $(window).height();
				//console.log("Screensave window "+ app.screenw + " x " + app.screenh);
				
				// prepare the images
				switch(app.position){
					case 'fill':
						app.images.each(function(){
							$(this).addClass('fill');
						});
						break;
					default:
						app.images.each(function(){
							// calc
							$(this).removeClass('width height');
							// set
							if($(this).width() > $(this).height()){
								if(app.screenw > app.screenh){
									$(this).addClass('width');
								}else{
									$(this).addClass('height');
								}
							}else{
								if(app.screenw > app.screenh){
									$(this).addClass('height');
								}else{
									$(this).addClass('width');
								}
							}
						});
						break;
				}
				// show the screen saver
				app.screen.show();
				// roll the images
				app.roll();
			},
			roll : function(){
				// hide all images
				if(app.animation == 'yes'){
					app.images.fadeOut(300);
				}else{
					app.images.hide();
				}
				// prepare the next image
				switch(app.position){
					case 'center':
						var img = app.images.eq(app.currImage);
						if(img.hasClass('width')){
							img.css({
								'top': (app.screenh - img.height())/2+ 'px',
								'left':'0px'
							});
						}else{
							img.css({
								'left': (app.screenw - img.width())/2+ 'px',
								'top':'0px'
							});
						}
					break;
				}
				// display the next element
				// show the screen saver
				if(app.animation == 'yes'){
					app.images.eq(app.currImage).delay(300).fadeIn(600);
				}else{
					app.images.eq(app.currImage).show();
				}
				// increase index
				if(app.currImage < app.images.length-1) app.currImage++;
				else app.currImage = 0;
				// set the rolltimer
				//console.log('Screensave showing '+app.currImage);
				app.rollTimer = setTimeout(app.roll, parseInt(app.delay));
			},
			rollTimer : null,
			currImage : 0,
			images : null,
			timer : null,
			screen : null,
			screenw : 0,
			screenh : 0,
			
			folder : '',
			urls : [],
			wait : 120,
			delay : 20,
			position : 'fill',
			animation : 'no'
		}
		app.init(options);
	};
})(jQuery);