 var modal = document.querySelector(".modal");
 var modal2 = document.querySelector(".modal");
    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".close-button");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    
   

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
        if (event.target === modal2) {
            toggleModal();
        }
        
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
	
    $(function(){
        var overlay = $('<div id="overlay"></div>');
        overlay.show();
        overlay.appendTo(document.body);
        $('.popup').show();
        $('.close').click(function(){
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
        });
        
        
         
        
        $('.x').click(function(){
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        return false;
        });
        });