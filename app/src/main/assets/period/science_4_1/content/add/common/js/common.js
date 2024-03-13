'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var view = COMMONLIBRARY.view;
	var tools = COMMONLIBRARY.tools;

	view.setScale();
	view.initDeco();
	view.setDeco();

	
	tools.init();

	$('input[type="text"]').keyup(function (){
		if ($(this).val().length > $(this).attr('maxlength')) {
			$(this).val($(this).val().substr(0, $(this).attr('maxlength')));
		}
	})
});


window.addEventListener('resize', COMMONLIBRARY.view.setScale);
window.addEventListener('resize', COMMONLIBRARY.view.setDeco);

var filename = document.location.href.match(/[^\/]+$/)[0];

function getElementIdx(node, tagSelector) {
	for (let i = 0; i < tagSelector.length; i++) {
		if (node === tagSelector[i]) {
			return i;
		}
	}
}

function setSessionStorageItem(nodes, tagSelector) {
	if (nodes.length > 0) {
		nodes.keyup(function() {
			let id = filename + (this.tagName == "TEXTAREA" ? "_T_" : "_I_") + getElementIdx(this, tagSelector);
			sessionStorage.setItem(id, this.value);
		});
	}
}

function setInputSavedValue(nodes) {
	for (let i = 0; i < nodes.length; i++) {
		let id = filename + (nodes[i].tagName == "TEXTAREA" ? "_T_" : "_I_") + i;
		let nodeValue = sessionStorage.getItem(id);
		if (nodeValue) {
			nodes[i].value = nodeValue;
		}
	}
}

$(document).ready(function() {
	let length = sessionStorage.length;
	let inputs = $('input[type="text"]');
	let textAreas = $('textarea');

	setSessionStorageItem(inputs, $('input[type="text"]'));
	setSessionStorageItem(textAreas, $('textarea'));

	setInputSavedValue(inputs);
	setInputSavedValue(textAreas);

	
});