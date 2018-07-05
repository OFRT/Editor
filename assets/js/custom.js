var ifpc = true;

 jQuery(function($) {

        $(".sidebar-dropdown > a").click(function(){
	        $(".sidebar-submenu").slideUp(250);
        	if ($(this).parent().hasClass("active")){
 		         $(".sidebar-dropdown").removeClass("active");
 		         $(this).parent().removeClass("active");
        	}else{
        		$(".sidebar-dropdown").removeClass("active");
        		$(this).next(".sidebar-submenu").slideDown(250);
        	 	$(this).parent().addClass("active");
        	}

        });

        $("#toggle-sidebar").click(function(){
          $(".page-wrapper").toggleClass("toggled");
          // 菜单变换时，重载 mdEditor
          if (mdEditor) {
            setTimeout('mdEditor.recreate()', 300);
          }
        });

        if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          $("#desktop-menu").show();
          $(".sidebar-content").mCustomScrollbar({
            axis:"y",
            autoHideScrollbar: true,
            scrollInertia: 300
          });
          $(".sidebar-content").addClass("desktop");
//        console.log("电脑");
          ifpc = true;
        } else {
          $("#desktop-menu").hide();
//        console.log("手机");
          ifpc = false;
        }

    });
