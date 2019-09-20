<template>
   <div class="miss">
		<img src="./../assets/images/miss.jpg" alt="">
		<h2>哎呀亲...你访问的页面出错了!</h2>
		<p>你输入的网址有误或者链接已经过期。</p>
		<input type="button" value="返回首页" @click="getIndex">
	</div>  
</template>

<script>
export default {
    data(){
		return{
			name:'404'
		}
	},
    methods:{
        getIndex(){
            this.$router.push('/work');
        }
    }
}
</script>

<style>
 .miss{
     padding-top: 100px;
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
	background: #fff;
}
.miss h2{
	font-weight: normal;
	font-size: 24px;
}
.miss p{
	height: 40px;
	line-height: 40px;
	font-size: 14px;
}
.miss input{
	width: 100px;
	height: 30px;
	border:none;
	outline: none;
	border-radius: 5px;
	background-color: #368;
	color: #fff;
	cursor:pointer;
}
</style>
