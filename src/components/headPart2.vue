<template>
    <div class="header">
        <div class="header_c">
            <dl class="logo">
                <dt><router-link to="/home">
                    <h1 class="h1t">医疗信息管理系统</h1></router-link></dt>
            </dl>
            <!--end标志-->
            <div class="header_r">
                <dl class="nav th">
                    <dd id="nav_hover01">
                        <router-link to="/home"><em>首页</em></router-link></dd>
                    <dd id="nav_hover02">
                        <router-link to="/register"><em>登记工作站</em></router-link>
                    </dd>
                    <dd id="nav_hover03">
                        <router-link to="/dati"><em>大体工作站</em></router-link></dd>
                    <dd id="nav_hover04">
                        <a href="contact.html"><em>包埋工作站</em></a></dd>
                    <dd id="nav_hover05">
                        <a href="/html/help/"><em>制片工作站</em></a></dd>
                    <dt><a href="http://merchant.kalegou.com/login.aspx" target="_blank" class="login_a">
                        登录</a><a href="http://merchant.kalegou.com/Register.aspx" target="_blank" class="reg_a">注册</a></dt>
                </dl>
            </div>

            <div class="header_r2">
                <dl class="nav th">
                    <dd id="nav_hover001">
                        <router-link to="/home"><em>主诊工作站</em></router-link></dd>
                    <dd id="nav_hover002">
                        <router-link to="/register"><em>特检工作站</em></router-link>
                    </dd>
                    <dd id="nav_hover003">
                        <router-link to="/dati"><em>报告打印工作站</em></router-link></dd>
                    <dd id="nav_hover004">
                        <a href="contact.html"><em>系统管理工作站</em></a></dd>
                    <dd id="nav_hover005">
                        <a href="/html/help/"><em>归档工作站</em></a></dd>
                    <dd id="nav_hover006">
                        <a href="/html/help/"><em>远程工作站</em></a></dd>
                </dl>
            </div>
            
            <!--end头文件右-->
            
        </div>
        <!--end头文件内容-->
    </div>
</template>

<script>
export default {
  name: 'headPart'

}
</script>

<style scoped>
.header{ clear:both; height:190px; background:#fff; margin:0; }
.header_c{ clear:both; height:85px; width:1000px; margin:0 auto; }
dl.logo{ float:left;}
dl.nav{font-size:15px; color:#848484; float:right; height:35px; line-height:35px;}
dl.nav a{ color:#6b6a6a;}
dl.nav a:hover{ color:#ff6600; text-decoration:none;}
dl.nav dd{ z-index:12; margin-left:4px;  position:relative; float:left; }
dl.nav dd a{ display:block; float:left;height:100%; padding:0 18px 0 0; }
dl.nav dd a em{ cursor:pointer; font-style:normal; display:block; float:left; height:100%; padding:0 0 0 18px;}
dl.nav dd a:hover{ _color:#fff;}
dl.nav dt{ height:100%; background:url(../assets/light_y.gif) no-repeat left center; padding-left:0px; float:left;margin-left:20px}
dl.nav dt a{ display:block; float:left; padding-left:24px; margin-left:10px;}
.header_r{ float:right; padding:30px 0 0 0;}
.header_r2{float:left; width:100%}
#nav_btn01 #nav_hover01 a,#nav_btn02 #nav_hover02 a,#nav_btn03 #nav_hover03 a,#nav_btn04 #nav_hover04 a,#nav_btn05 #nav_hover05 a,#nav_btn06 #nav_hover06 a{background:url(../assets/nav_hover.png) no-repeat right -35px; color:white;}
#nav_btn01 #nav_hover01 em,#nav_btn02 #nav_hover02 em,#nav_btn03 #nav_hover03 em,#nav_btn04 #nav_hover04 em,#nav_btn05 #nav_hover05 em,#nav_btn06 #nav_hover06 em{background:url(../assets/nav_hover.png) no-repeat left top;}
#nav_btn01 #nav_hover01 a:hover,#nav_btn02 #nav_hover02 a:hover,#nav_btn03 #nav_hover03 a:hover,#nav_btn04 #nav_hover04 a:hover,#nav_btn05 #nav_hover05 a:hover,#nav_btn06 #nav_hover06 a:hover{ color:#ff9;}
dl.nav dd a:hover{ background:url(../assets/nav_hover.png) no-repeat right -35px;}
dl.nav dd a:hover em{ color:#fff; background:url(../assets/nav_hover.png) no-repeat left top;}
.h1t { font-size:34px;}
</style>