(function($){
    function field (fieldType) {
        var templateResult = function (state, el) {
            console.log('templateResult', state);
            return state.text;
        };

        var templateSelection = function (state, el, b) {
            console.log('templateSelection', state, el, this);
            this.value = state.id;
            return state.text;
        };

        var init = function ($field) {
            var input = $field.find('[data-ui="1"]').first();
            if (!input) {
                return;
            }

            var options = {
                debug: true,
                allowClear: !!input.data('allow-null')
            };

            if ($.fn.select2.defaults.formatResult) { // v3
                options.formatResult = templateResult.bind(input);
                options.formatSelection = templateSelection.bind(input);
            } else { // v4
                options.templateResult = templateResult.bind(input);
                options.templateSelection = templateSelection.bind(input);
            }

            input.select2(options);
        };

        if (typeof acf.add_action !== 'undefined') {
            acf.add_action('ready_field/type=' + fieldType, init);
            acf.add_action('append_field/type=' + fieldType, init);
            acf.add_action('show_field/type=' + fieldType, init);
        } else {
            $(document).on('acf/setup_fields', function(e, postbox) {
                $(postbox)
                    .find('.field[data-field_type="' + fieldType + '"]')
                    .each(function() {
                        init($(this));
                    });
            });
        }
    }

    field('japan_pref');
})(jQuery);

// (function ($) {
//     var C = function(type){
//         var me = this;
//         this.type = type;
//         if (typeof acf.add_action !== 'undefined') {
//             acf.add_action('ready append', function(el) {
//                 acf.get_fields({type: type}, el).each(me.init);
//             });

//             acf.conditional_logic.extend({
//                 calculate: function (rule, trigger, target) {
//                     me.calculate(this, rule, trigger, target);
//                 }
//             });
//         }
//     };

//     C.prototype.init = function (i, el) {
//         var select = $(el).find('[data-ui="1"]');
//         console.log(select);
//         if (!select.length) {
//             return;
//         }

//         select.select2({
//             allowClear: !!select.data('allow-null'),
//             formatResult: this.formatResult,
//             formatSelection: this.formatSelection
//         });
//     };

//     C.prototype.formatResult = function (result, container, query, escapeMarkup) {
//         var id = result.id;
//         var text = $.fn.select2.defaults.formatResult(result, container, query, escapeMarkup);
//         console.log('formatResult', text);
//         return text;
//         // var text = $.fn.select2.defaults.formatResult(result, container, query, escapeMarkup);
//         // return format_country(result.id.toLowerCase(), text);
//     };

//     C.prototype.formatSelection = function (result, container, query, escapeMarkup) {
//         var id = result.id;
//         var text = result.text;
//         console.log('formatSelection', text);
//         return text;
//         // return '<span class="acf-country-flag-icon famfamfam-flags ' + id + '"></span> <span class="acf-country-flag-name">' + name + '</span>';
//     };

//     C.prototype.calculate = function(instance, rule, trigger, target) {
//         if (!trigger || !target) {
//             return false;
//         }

//         // debug
//         //console.log( 'calculate(%o, %o, %o)', rule, trigger, target);

//         // vars
//         var match = false, type = trigger.data('type');

//         // input with :checked
//         if (type === 'true_false' || type === 'checkbox' || type === 'radio') {
//             match = instance.calculate_checkbox(rule, trigger);
//         } else if (type === 'select' || type === this.type) {
//             match = instance.calculate_select(rule, trigger);
//         }

//         // reverse if 'not equal to'
//         if (rule.operator === "!=") {
//             match = !match;
//         }

//         return match;
//     };

//     new C('japan_pref');
//     // function format_country(code, country) {
//     // 	return '<span class="acf-country-flag-icon famfamfam-flags ' + code + '"></span> <span class="acf-country-flag-name">' + country + '</span>';
//     // }

//     // function format_country_result(result, container, query, escapeMarkup) {
//     // 	var text = $.fn.select2.defaults.formatResult(result, container, query, escapeMarkup);
//     // 	return format_country(result.id.toLowerCase(), text);
//     // }

//     // function format_country_selection(result, container, query, escapeMarkup) {
//     // 	return format_country(result.id.toLowerCase(), result.text);
//     // }

//     // function init_field( $el ) {
//     // 	var $acf_country = $el.find('[data-ui="1"]');
//     // 	if( !$acf_country.length ) {
//     // 		return;
//     // 	}
//     // 	$acf_country.select2({
//     // 		// allowClear: !!$acf_country.data('allow-null'),
//     // 		// formatResult: format_country_result,
//     // 		// formatSelection: format_country_selection
//     // 	});
//     // }
    
//     // if( typeof acf.add_action !== 'undefined' ) {
//     //     acf.add_action('ready append', function( $el ){

//     // 		// search $el for fields of type 'acf_country'
//     // 		acf.get_fields({ type : 'japan_pref'}, $el).each(function(){

//     // 			var target = $el.find('[data-ui="1"]');
//     //             if( !$acf_country.length ) {
//     //                 return;
//     //             }
//     //             $acf_country.select2({
//     //                 // allowClear: !!$acf_country.data('allow-null'),
//     //                 // formatResult: format_country_result,
//     //                 // formatSelection: format_country_selection
//     //             });

//     // 		});

//     // 	});
//     // }
// })(jQuery);
