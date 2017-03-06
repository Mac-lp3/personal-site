'use strict';

const activeLink = 'active-link';
const hiddenCopy = 'hidden-copy';
const linkList = document.querySelectorAll('.nav-conainter > li > a');
const copyList = document.querySelectorAll('.copy-wrapper > div');
const navDivider = document.querySelectorAll('.nav-divider')[0];
const copyWrapper = document.querySelectorAll('.copy-wrapper')[0];
const mainWrapper = document.querySelectorAll(".wrapper")[0];

function selectNav(elementId) {

			copyWrapper.className = 'copy-wrapper slide-element-out';
			navDivider.className = 'nav-divider close-divider';
			mainWrapper.className = 'wrapper wrapper-' + elementId;

			setTimeout(() => {

				// apply unselected color to each link
				for (let i = 0; i < linkList.length; ++i) {
					linkList[i].className = '';
				}

				// apply selected color to selected link
				document.getElementById(elementId + '-link').className = activeLink;

				// hide each copy-text container
				for (let i = 0; i < copyList.length; ++i) {
					copyList[i].className = hiddenCopy;
				}

				// show the selected container
				document.getElementById(elementId + '-copy').className = elementId + '-copy';

				// apply slide-in animation & open divider
				copyWrapper.className = 'copy-wrapper slide-element-in';
				navDivider.className = 'nav-divider open-divider';

		}, 400);
};

/*
 * On ready functions
 */
 document.getElementById('home-link').className = activeLink;
