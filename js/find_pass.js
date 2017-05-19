/**
 * Created by Administrator on 2017/3/31.
 */
var flag_email = false;
var flag_code = false;

$(document).ready(function(){
    $('#code_img').attr('src',url_sso+'/captcha?r='+Math.random());
});
//检测邮箱
function check_email(){
    var email = $.trim($("#email").val());
    if(email == ''){
        $("#email").attr("class","app_input_cuowu");
        $("#email_tip").text("请填写邮箱");
        return false;
    }
    var pattern = /^[a-zA-z0-9][a-zA-Z0-9_\-\.]*@([a-zA-Z0-9]+[_\-\.])+[a-zA-Z]{2,4}$/;
    if(!pattern.test(email)){
        $("#email").attr("class","app_input_cuowu");
        $("#email_tip").text("邮箱格式错误");
        return false;
    }
    $.getJSON(url_sso+'/userCheck?jsoncallback=?',{propName:'name',propValue:email},function(data){
        if(data.retCode == 'ok'){
            $("#email").attr("class","app_input_cuowu");
            $("#email_tip").text("邮箱未被注册！");
            flag_email = false;
        }else if(data.retData == 'exist'){
            $("#email").attr("class","app_input");
            $("#email_tip").text("");
            flag_email = true;
        }else{
            $("#email").attr("class","app_input_cuowu");
            $("#email_tip").text("系统错误！");
            flag_email = false;
        }
    });
}
//验证码
function change_code(){
    var url = url_sso+'/captcha?r='+Math.random();
    $('#code_img').attr('src',url);
}
function check_code(){
    var code = $("#code").val();
    $.getJSON(url_sso+'/captchaValidate?jsoncallback=?',{code:code},function(data){
        if(data.retCode == 'ok'){
            $("#code").attr("class","app_input");
            $("#code_tip").text("");
            flag_code = true;
        }else{
            $("#code").attr("class","app_input_cuowu");
            $("#code_tip").text("验证码错误");
            flag_code = false;
        }
    });
}
//发送邮件
function send_code(){
    //邮箱
    var email = $.trim($("#email").val());
    if(email == ''){
        $("#email").attr("class","app_input_cuowu");
        $("#email_tip").text("请填写邮箱");
        return false;
    }
    var pattern = /^[a-zA-z0-9][a-zA-Z0-9_\-\.]*@([a-zA-Z0-9]+[_\-\.])+[a-zA-Z]{2,4}$/;
    if(!pattern.test(email)){
        $("#email").attr("class","app_input_cuowu");
        $("#email_tip").text("邮箱格式错误");
        return false;
    }
    //验证码
    var code = $("#code").val();
    if(code == ""){
        $("#code").attr("class","app_input_cuowu");
        $("#code_tip").text("请填写验证码");
        return false;
    }
    if(!flag_email || !flag_code){
        return false;
    }
    var mail_url = 'http://mail.'+email.split('@')[1];
    $.getJSON(url_sso+'/pwdRestore?jsoncallback=?',{email:email,code:code},function(result){
        if(result.retCode == 'ok'){
            mail_url = result.retMsg;
            $("#mail_url").html("<a style='color:#004A8F;' target='blank' href='"+mail_url+"'>立即进入邮箱</>");
            open_window("pass_box");
        }else{
            alert('非常抱歉,找回密码失败!');
        }
    });
}
//窗口事件
function open_window(id){
    $("#mask_"+id).show();
    $("#"+id).show();
}
function close_window(id){
    $("#mask_"+id).hide();
    $("#"+id).hide();
}
//----------------------------------------------重置密码
//检测密码
function check_password(){
    var password = $("#password").val();
    if(password == ""){
        $("#password").attr("class","app_input_cuowu");
        $("#password_tip").text("请填写密码");
        return false;
    }
    if(password.length<6 || password.length>20){
        $("#password").attr("class","app_input_cuowu");
        $("#password_tip").text("6-20个字符");
        return false;
    }
    $("#password").attr("class","app_input");
    $("#password_tip").text("");
}
//检测密码2
function check_password2(){
    var password = $("#password").val();
    var password2 = $("#password2").val();
    if(password2 == ""){
        $("#password2").attr("class","app_input_cuowu");
        $("#password2_tip").text("请填写密码");
        return false;
    }
    if(password != password2){
        $("#password2").attr("class","app_input_cuowu");
        $("#password2_tip").text("密码输入不一致");
        return false;
    }
    $("#password2").attr("class","app_input");
    $("#password2_tip").text("");
}
//重置密码
function reset_password(){
    //密码1
    var password = $("#password").val();
    if(password == ""){
        $("#password").attr("class","app_input_cuowu");
        $("#password_tip").text("请填写密码");
        return false;
    }
    if(password.length<6 || password.length>20){
        $("#password").attr("class","app_input_cuowu");
        $("#password_tip").text("6-20个字符");
        return false;
    }
    $("#password").attr("class","app_input");
    $("#password_tip").text("");
    //密码2
    var password2 = $("#password2").val();
    if(password2 == ""){
        $("#password2").attr("class","app_input_cuowu");
        $("#password2_tip").text("请填写密码");
        return false;
    }
    if(password != password2){
        $("#password2").attr("class","app_input_cuowu");
        $("#password2_tip").text("密码输入不一致");
        return false;
    }
    $("#password2").attr("class","app_input");
    $("#password2_tip").text("");
    var email = $("#email").val();
    var token = $("#token").val();
    //重置
    $.getJSON(url_sso+'/pwdReset?jsoncallback=?',{name:email,token:token,newPwd:password},function(json){
        if(json.retCode == 'ok'){
            alert('重置密码成功');
            window.location = 'http://newsso.appcan.cn/login?service=http://i.appcan.cn/';
        }else{
            alert('非常抱歉,找回密码失败!');
        }
    });
}
