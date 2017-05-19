
$(function(){
    $.ajax({
        type:"GET",
        url:'js/tu.js',
        success:function(data){
            var list="";
            for(var i=0;i<data.length;i++){
                list+='<div class="col-md-2 text-center box" >\
                        <div class="info">\
                        <div class="pic"> <img src="'+data[i].src+'" alt=""></div>\
                        </div>\
                        </div>';
            }
            $("#showpic").append(list);
        },
        error:function(){}
    });
})



