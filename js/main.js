'use strict';

const activeLink = 'active-link';
const linkList = document.querySelectorAll('.nav-conainter > li > a');
const contentContainer = document.querySelectorAll('.content-container')[0];
const navDivider = document.querySelectorAll('.nav-divider')[0];

/*
 * Removes active styling from other links and applies it to one that has been clicked.
 */
function selectNav(elementId) {

	fadeDivider();

	for (let i = 0; i < linkList.length; ++i) {
		linkList[i].className = '';
	} 

	document.getElementById(elementId).className = activeLink;

};

function fadeDivider() {

	// calculate max margin in px
	var to = contentContainer.clientHeight / 2;
  
  	animate({
    	delay: 10,
    	duration: 350, // 1 sec by default
    	delta: function quad(progress) {
  			return Math.pow(progress, 2)
		},
    	step: function(delta) {
      		navDivider.style.marginTop = to*delta + "px";
			navDivider.style.marginBottom = to*delta + "px";
    	}
  	});
};

function animate(opts) {

  	var start = new Date;
	var id = setInterval(function() {
	    var timePassed = new Date - start;
	    var progress = timePassed / opts.duration;

	    if (progress > 1) progress = 1;
		
		var delta = opts.delta(progress);
	    opts.step(delta);
	     
	    if (progress == 1) {
	      clearInterval(id);
	    }
	}, opts.delay || 10);
};


/*
 * On ready functions
 */
 document.getElementById('homeLink').className = activeLink;