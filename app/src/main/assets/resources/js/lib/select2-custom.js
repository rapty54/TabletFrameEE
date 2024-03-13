var Select2Binder = {
	
	/**
	 * 일반 페이지에서 select option을 추가하거나 DB에서 가져와서 하는경우 사용 
	 * @param $target 적용될 대상  
	 */
	bind: function($target) {
		var options = {
			selectOnClose: false,
			// width: "200px",
			// allowClear: true,
			dropdownAutoWidth: true,
			dropdownPosition: 'below',
			minimumResultsForSearch: -1,
			// dropdownParent: parentElement
		};
		// 동적으로 가져온 html에 태그에 대하여 바인딩 하는 경우
		if ($target) {
			$($target).find('.ui-select2, .ui-select3, .ui-select4').each(function() {
				if ($(this).hasClass('ui-select2')) {
					options.dropdownParent = $(this).closest('span.ui-select-parent');
				} else if ($(this).hasClass('ui-select3')) {
					options.dropdownParent = $(this).closest('span.ui-select-parent2');
				}
				$(this).select2(options);
			});			
		} else {
			$('.ui-select2, .ui-select3, .ui-select4').each(function() {
				if ($(this).closest('.ui-select2-dropdown-parent').length > 0) {
					options.dropdownParent = $(this).closest('.ui-select2-dropdown-parent');
				} else {
					if ($(this).hasClass('ui-select2')) {
						options.dropdownParent = $(this).closest('span.ui-select-parent');
					} else if ($(this).hasClass('ui-select3')) {
						options.dropdownParent = $(this).closest('span.ui-select-parent2');
					}
				}
				$(this).select2(options);
			});
		}
	},
	
	/**
	 * 동적으로 데이터를 가져와서 사용하는 경우
	 * @param options
	 */
	bindAjax: function(options) {
		$('#' + options.id).select2({
			minimumResultsForSearch: -1,
			language: {
				searching: function() { return ""; },
			},
			placeholder: options.placeholder,
			ajax: {
				type: "POST",
				dataType: 'json',
				url: options.url,
				data: options.data,
				processResults: function(data) {
					return {
						results: data
					};
				},
			}
		});
	}
}

$(function() {
	Select2Binder.bind();
});