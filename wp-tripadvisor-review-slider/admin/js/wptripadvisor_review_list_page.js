(function( $ ) {
	'use strict';

	$(function(){

		// Help button.
		$( '#wptripadvisor_helpicon' ).click(function() {
			openpopup(
				'Tips',
				'<p>- Click the <i class="dashicons dashicons-visibility text_green" aria-hidden="true"></i> icon to hide or show a review on your site.</p>' +
				'<p>- Click the <i class="dashicons dashicons-admin-tools" aria-hidden="true"></i> icon to edit the reviewer photo.</p>' +
				'<p>- Click the <i class="dashicons dashicons-trash" aria-hidden="true"></i> icon to delete a review from your WordPress database.</p>' +
				'<p><b>- Remove All Reviews:</b> Deletes all reviews in your WordPress database and starts over. It does NOT affect your reviews on TripAdvisor.</p>',
				''
			);
		});

		$( '#wptripadvisor_addnewreview_cancel' ).click(function() {
			jQuery( '#wptripadvisor_new_review' ).hide( 'slow' );
			setTimeout(function(){
				window.location.href = '?page=wp_tripadvisor-reviews';
			}, 500);
		});

		// Remove all / remove by source.
		$( '#wptripadvisor_removeallbtn' ).click(function() {
			var sec = $( this ).attr( 'data-sec' );
			var btnhtml2 = '';
			var pagearray = [];
			try {
				pagearray = JSON.parse( adminjs_script_vars.pagenamearray || '[]' );
			} catch ( e ) {
				pagearray = [];
			}
			for ( var i = 0; i < pagearray.length; i++ ) {
				if ( ! pagearray[i] ) {
					continue;
				}
				var tempopt = encodeURIComponent( pagearray[i] );
				btnhtml2 += '<a class="button rmrevbtn dashicons-before dashicons-no" href="?page=wp_tripadvisor-reviews&opt_type=page&opt=' + tempopt + '&_wpnonce=' + sec + '">' + $('<div>').text( pagearray[i] ).html() + '</a> ';
			}
			var bySource = btnhtml2 ? '<p>Remove by source:</p>' + btnhtml2 : '';
			openpopup(
				'Are you sure?',
				'<p>This will delete reviews in your WordPress database. It does NOT affect your reviews on TripAdvisor.</p>',
				'<a class="button dashicons-before dashicons-no" href="?page=wp_tripadvisor-reviews&opt=delall&_wpnonce=' + sec + '">Remove All</a>' + bySource
			);
		});

		// Upload avatar.
		$( '#upload_avatar_button' ).click(function() {
			tb_show( 'Upload Reviewer Avatar', 'media-upload.php?referer=wp_tripadvisor-reviews&type=image&TB_iframe=true&post_id=0', false );
			return false;
		});
		window.send_to_editor = function( html ) {
			var image_url = jQuery( '<div>' + html + '</div>' ).find( 'img' ).attr( 'src' );
			$( '#wprevpro_nr_avatar_url' ).val( image_url );
			$( '#avatar_preview' ).attr( 'src', image_url );
			tb_remove();
		};

		// Default avatar click.
		$( '.rlimg' ).click(function() {
			var tempsrc = $( this ).attr( 'src' );
			$( '#wprevpro_nr_avatar_url' ).val( tempsrc );
			$( '#wprevpro_nr_avatar_url' ).select();
			$( '#avatar_preview' ).attr( 'src', tempsrc );
		});

		function openpopup( title, body, body2 ) {
			jQuery( '#popup_titletext' ).html( title );
			jQuery( '#popup_bobytext1' ).html( body );
			jQuery( '#popup_bobytext2' ).html( body2 );
			var popup = jQuery( '#popup_review_list' ).popup({
				width: 400,
				offsetX: -100,
				offsetY: 0
			});
			popup.open();
			var bodyheight = Number( jQuery( '.popup-content' ).height() ) + 10;
			jQuery( '#popup_review_list' ).height( bodyheight );
		}

		// Show edit form when editrid is set from URL.
		if ( jQuery( '#editrid' ).val() !== '' ) {
			jQuery( '#wptripadvisor_new_review' ).show( 'slow' );
		}

	});

})( jQuery );
