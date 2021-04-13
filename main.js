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

		tabElems.forEach((tabElem) => {
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
