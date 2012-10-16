/*
	Mod ScreenSave
	Marko(at)Zabreznik.net
	2011/11/15 22:18
*/

var ScreenSave = new Class({
	options: {
		images: [],
		wait: 60,
		delay: 5,
		opacity: 100,
	},
	initialize: function(op){
		this.setOptions(op);
		
		this.active = false;
		this.imageElement = new Element('img',{'class': 'screensaveImg', 'id': 'screensaveImg'});
		this.overlayElement=new Element('div',{'class': 'screensave', 'id': 'screensave'});
		this.overlayElement.adopt(this.imageElement);
		$(document.body).adopt(this.overlayElement);
		
		
		var scroolsize = document.getScrollSize();
		this.overlayElement.setStyles({
			'display': 'none',
			'height' : scroolsize.y+'px',
			'width': scroolsize.x+'px',
			'opacity': this.options.opacity,
			'position': 'absolute','top': '0','left': '0','z-index': '90','background': '#000'
		});
		this.imageElement.setStyles({ 'position': 'absolute' });	

		this.current = this.options.images.length;
		
		this.delayTimer = $clear(this.delayTimer);
		this.waitTimer = this.startSS.bind(this).delay(this.options.wait*1000);
		$(document.body).addEvent('mousemove', function(e) {
			if (this.active == true)
				this.stopSS();
			else {
				this.waitTimer = $clear(this.waitTimer);
				this.waitTimer = this.startSS.bind(this).delay(this.options.wait*1000);
			}
		}.bindWithEvent(this));
	},
 	startSS: function () {
		this.active = true;
		this.ShowHideAvancedElements(true);
		this.changeImage();
		var scroolsize = document.getScrollSize();
		this.overlayElement.setStyles({
			'display': 'block',
			'height' : scroolsize.y+'px',
			'width': scroolsize.x+'px'
		});
		this.delayTimer = this.changeImage.bind(this).periodical(this.options.delay*1000);
	},
 	stopSS: function () {
		this.active = false;
		this.delayTimer = $clear(this.delayTimer);
		this.ShowHideAvancedElements(false);
		this.overlayElement.style.display = 'none';
	},
 	changeImage : function () {
		this.current = (this.current < this.options.images.length) ? this.current+1 : 0;
		this.imageElement.src = this.options.images[this.current].s;
		this.imageElement.setStyles({ 'width': this.options.images[this.current].w, 'height': this.options.images[this.current].h });

		this.imageElement.style.top = $random(getScrollTop()+20,getScrollTop()+getHeight()-this.imageElement.height-20)+'px';
		this.imageElement.style.left= $random(getScrollLeft()+20,getScrollLeft()+getWidth()-this.imageElement.width-20)+'px';
	},
	ShowHideAvancedElements: function (visible) {
		$$("applet", "iframe", "select").visibility = (visible) ? "visible": "hidden";
	}
});
ScreenSave.implement(new Options);
