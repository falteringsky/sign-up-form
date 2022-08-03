$(document).ready(function(){
// Test for placeholder support
$.support.placeholder = (function(){
    var i = document.createElement('input');
    return'placeholder' in i;
})();

// Hide labels by default if placeholders are supported
if($.support.placeholder) {
    $('.form li').each(function(){
        $(this).addClass('js-hide-label');
    });  

    // Code for adding/removing classes here
    $('.form li').find('input').on('keyup blur focus', function(e){
    
        // Cache our selectors
        var $this = $(this),
            $parent = $this.parent();
    
        // Add or remove classes
        if (e.type == 'keyup') {
            // keyup code here
            if( $this.val() == '' ) {
                $parent.addClass('js-hide-label'); 
            } else {
                $parent.removeClass('js-hide-label');   
            }                
        } 
        else if (e.type == 'blur') {
            // blur code here
            if( $this.val() == '' ) {
                $parent.addClass('js-hide-label');
            } 
            else {
                $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
            }
        } 
        else if (e.type == 'focus') {
            // focus code here
            if( $this.val() !== '' ) {
                $parent.removeClass('js-unhighlight-label');
            }
        }
    });
}
});
