(function () {
/**
 * 1) Create tab blocks and tab-category blocks with data-attributes "block-name-id"
 *
 * container: <div class="js-custom-tab"></div>
 * tab:       <div data-custom-tab="id"></div>
 * category:  <div data-custom-tab-category="id"></div>
 *
 * 2) Create CSS classes .visually-hidden, .fade, .fadeOut
 *
 */


	// Find elements
  //---------------------------------
	var elems = document.querySelectorAll('.js-custom-tab');
	if (!(NodeList.prototype.isPrototypeOf(elems) && elems.length > 0)) return;
	var elems = Array.prototype.slice.call(elems);

	elems.forEach(function(elem) {
		var tabElems = elem.querySelectorAll('[data-custom-tab]');
		if (!(NodeList.prototype.isPrototypeOf(tabElems) && tabElems.length > 0)) return;
		var tabElems = Array.prototype.slice.call(tabElems);

		var catElems = tabElems.reduce(function(obj, tabElem) {
			var id = tabElem.dataset.customTab;
			obj[id] = elem.querySelector('[data-custom-tab-category="'+ id +'"]');
			return obj;
		}, {});


		// Set default state
		//---------------------------------

		var currentTab = tabElems[0];
		currentTab.classList.add('active');

		var currentCat = catElems[currentTab.dataset.customTab];
		currentCat.classList.add('fadeOut');

		tabElems.forEach(function(tabElem) {
			var catElem = catElems[tabElem.dataset.customTab];
			catElem.classList.add('fade');
			if (catElem !== currentCat) {
				catElem.classList.add('visually-hidden');
			}
		});


		// Set listeners
		//---------------------------------
		tabElems.forEach(function(tabElem) {
			tabElem.addEventListener('click', function() {
				if (tabElem !== currentTab) {
					currentTab.classList.remove('active');
					currentTab = tabElem;
					currentTab.classList.add('active');

					currentCat.classList.remove('fadeOut');
					window.setTimeout(function() {
						currentCat.classList.add('visually-hidden');
						currentCat = catElems[currentTab.dataset.customTab];

						currentCat.classList.remove('visually-hidden');
						currentCat.classList.add('fadeOut');
					}, 500);
				}
			});
		});
	});
})();


  function debounce(f, ms) {
    var isCooldown = false;
    return function() {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(function() {
        isCooldown = false;
      }, ms);
    };
  }

  function throttle(func, ms) {
    var isThrottled = false;
    var savedArgs;
    var savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      func.apply(this, arguments);
      isThrottled = true;
      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  }

  function slideUp(elem, duration) {
    elem.style.setProperty('will-change', 'height, margin, padding');
    elem.style.setProperty('transition-property', 'height, margin, padding');
    elem.style.setProperty('transition-duration', duration + 'ms');

    elem.style.setProperty('height', elem.offsetHeight + 'px');
    elem.offsetHeight;
    elem.style.setProperty('overflow', 'hidden');
    elem.style.setProperty('height', '0');
    elem.style.setProperty('padding-top', '0');
    elem.style.setProperty('padding-bottom', '0');
    elem.style.setProperty('margin-top', '0');
    elem.style.setProperty('margin-bottom', '0');

    window.setTimeout(function() {
      elem.style.setProperty('display', 'none');
      elem.style.removeProperty('height');
      elem.style.removeProperty('padding-top');
      elem.style.removeProperty('padding-bottom');
      elem.style.removeProperty('margin-top');
      elem.style.removeProperty('margin-bottom');
      elem.style.removeProperty('overflow');

      elem.style.removeProperty('transition-duration');
      elem.style.removeProperty('transition-property');
      elem.style.removeProperty('will-change');
    }, duration);
  }

  function slideDown(elem, duration) {
    elem.style.removeProperty('display');
    var display = window.getComputedStyle(elem).display;

    if (display === 'none') {
      display = 'block';
    }

    elem.style.display = display;
    var height = elem.offsetHeight;
    elem.style.overflow = 'hidden';
    elem.style.setProperty('overflow', 'hidden');
    elem.style.setProperty('height', '0');
    elem.style.setProperty('padding-top', '0');
    elem.style.setProperty('padding-bottom', '0');
    elem.style.setProperty('margin-top', '0');
    elem.style.setProperty('margin-bottom', '0');
    elem.offsetHeight;

    elem.style.setProperty('will-change', 'height, margin, padding');
    elem.style.setProperty('transition-property', 'height, margin, padding');
    elem.style.setProperty('transition-duration', duration + 'ms');

    elem.style.setProperty('height', height + 'px');
    elem.style.removeProperty('padding-top');
    elem.style.removeProperty('padding-bottom');
    elem.style.removeProperty('margin-top');
    elem.style.removeProperty('margin-bottom');
    window.setTimeout(function() {
      elem.style.removeProperty('height');
      elem.style.removeProperty('overflow');
      elem.style.removeProperty('transition-duration');
      elem.style.removeProperty('transition-property');
      elem.style.removeProperty('will-change');
    }, duration);
  }

  // Menu scroll
  // ---------------------------------
  (function () {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if (!isIE11) {
      var elems = document.querySelectorAll('a[href^="#"]');

      if (elems.length > 0) {
        [].forEach.call(elems, function(elem) {
          var href = elem.getAttribute('href');
          var target = 0;


          var onClick = debounce(function() {
            if (href !== '#') {
              var id = elem.getAttribute('href').substring(1);
              var targetElem = document.getElementById(id);
              var headerHeight = document.querySelector('.js-header-wrapper').offsetHeight;
              target = targetElem.offsetTop - headerHeight;
            }

            window.scrollTo({
              top: target,
              behavior: 'smooth'
            });
          }, 1000);

          elem.addEventListener('click', function(evt) {
              evt.preventDefault();
              onClick();
          });
        });
      }
    }

  }());
