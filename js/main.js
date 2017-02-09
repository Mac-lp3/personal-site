'use strict';

const activeLink = 'active-link';
const linkList = document.querySelectorAll('.nav-conainter > li > a');
const copyList = document.querySelectorAll('.copy-wrapper > div');
const contentContainer = document.querySelectorAll('.content-container')[0];
const navDivider = document.querySelectorAll('.nav-divider')[0];
const copyWrapper = document.querySelectorAll('.copy-wrapper')[0];

/*
 * Removes active styling from other links and applies it to one that has been clicked.
 */
function selectNav(elementId) {

	fadeDivider();

	changeCopy(elementId);

	for (let i = 0; i < linkList.length; ++i) {
		linkList[i].className = '';
	} 

	document.getElementById(elementId + '-link').className = activeLink;

};

function changeCopy(copyName){
	
	const to = 100;
	let current = 0;

	copyWrapper.style.display = 'block';

	animate({
    	delay: 10,
    	duration: 450, // in ms
    	delta: function quad(progress) {
  			return Math.pow(progress, 4);
		},
    	step: function(delta) {
    		
    		current = -(to * delta);
      		copyWrapper.style.transform = 'translate(' + current + 'px , 0px)';
      		copyWrapper.style.opacity = 1 - delta;

      		if (delta === 1) {
      			
      			// Hide each copy section
      			for (let i = 0; i < copyList.length; ++i) {
					copyList[i].style.display = 'none';
				}

				// Display the target section
				document.getElementById(copyName + '-copy').style.display = 'block';

      			animate({
			    	delay: 10,
			    	duration: 500, // in ms
			    	delta: function quad(progress) {
			  			return 1 - (1 - Math.pow(progress, 4));
					},
			    	step: function(delta) {
			    		
			    		current = -(to - (to * delta));
			      		copyWrapper.style.transform = 'translate(' + current + 'px , 0px)';
			      		copyWrapper.style.opacity = 1 - (1 - delta);
			      	}
			    });
      		}
    	}
  	});
};

function fadeDivider() {

	let style = navDivider.currentStyle || window.getComputedStyle(navDivider);
  	let currentTop = 0;
  	let currentBottom = 0;

	// calculate max margin in px
	let to = contentContainer.clientHeight / 2;
  	
  	// Close animation
  	animate({
    	delay: 10,
    	duration: 450, // in ms
    	delta: function quad(progress) {
  			return Math.pow(progress, 3);
		},
    	step: function(delta) {

    		currentTop = to*delta;
  			currentBottom = to*delta;
      		navDivider.style.marginTop = currentTop + "px";
			navDivider.style.marginBottom = currentBottom + "px";

			if (delta === 1) {
			
				// Open amination
				animate({
			    	delay: 10,
			    	duration: 500, // in ms
			    	delta: function quad(progress) {
			  			return 1 - (1 - Math.pow(progress, 4));
					},
			    	step: function(delta) {
			    		currentTop = to - to*delta ;
						currentBottom = to - to*delta;
			      		navDivider.style.marginTop = currentTop + "px";
						navDivider.style.marginBottom = currentBottom + "px";
			    	}
			  	});
			}
    	}
  	}); 
};

function animate(opts) {

  	const start = new Date;

	let id = setInterval(function() {
	    
	    const timePassed = new Date - start;
	    
	    let progress = timePassed / opts.duration;

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