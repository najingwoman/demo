$(function(){
  /* $(window).resize(function(){
       var img=$(".carousel-control img");
       var hImg=img.height();
       img.css("margin-top",-hImg/2);
   });*/

    /*       根部超链接悬浮字体颜色改变       */
    $(".foot a").hover(
        function(){$(this).css("color","white");},
        function(){$(this).css("color","#adadad");}
    );

    //置顶按钮;点击事件
    var toTop= $(".toTop");
    toTop.on("click",function(){
        $('html,body').animate({"scrollTop":"0"},200);
    });
    /*  鼠标滚动：置顶按钮的显示和隐藏   */
    $(window).scroll(function(){
       var scrollTop= $(window).scrollTop();
        if(scrollTop>=800){
            toTop.show();
        }else{
            toTop.hide();
        }
    });
    /*  纵向导航的显示和隐藏   */
    var $phoneShow=$("#myNav-hide");
    $("#show").click(function(){
        var $this=$(this);
        var attr=$this.attr("type");
        if(attr=="button"){
            $this.attr("type","");
            $phoneShow.animate({"right":"0"},100);
            $this.animate({"marginRight":"200px"},100);
          /*  $("body").animate({"marginRight":"190px"},100);*/
        }else{
            $this.attr("type","button");
            $phoneShow.animate({"right":"-190"},100);
            $this.animate({"marginRight":"15px"},100);
          /*  $("body").animate({"marginRight":"0"},100);*/
        }
    });
    /* 登陆  */
    $(".login").click(function(){
        window.open("login.html","_blank","width=400,height=500,top=100,left=100");
    });

});
