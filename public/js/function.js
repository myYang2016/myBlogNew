/**
 * Created by admin on 2017/1/11.
 */
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}
//跨域请求
var contentType ="application/x-www-form-urlencoded; charset=utf-8";
if(window.XDomainRequest)contentType = "text/plain";
var ajaxObj = {
    getData:function (url,data, fun, type) {
        if(!type)type='get';
        $.ajax({
            url:url,
            data:data,
            type:type,
            dataType:"json",
            contentType:contentType,
            success:function (data) {
              fun(data);
            },
            error:function (err) {
              console.log(err.toString());
            }
        })
    }
};