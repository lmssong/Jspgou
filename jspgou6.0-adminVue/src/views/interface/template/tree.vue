<template>
 <div class="forum-module">
        <div class="forum-header">
             <span class="forum-name">模版列表</span>
    </div>
     <div class="tree-layout">
        <!--文件夹-->
        <section class="file-tree-items">
            <div class="forum-header" style="background:#fff;border-bottom:none">
                <a href="javascript:void(0)" class="pull-left" @click="refresh" id="refresh">
                    <i class="iconfont bbs-refurbish" style="font-size: 20px"></i>
                   &nbsp;       
                </a>
                <span style="padding-left:5px;color:#4c5f70">
                   刷新     
                </span>
                 <div class="pull-right">
                            <a href="javascript:void(0)" @click="settingTpl(false)"><i class="iconfont bbs-iconfontdesktop" style="font-size: 20px"></i></a>
                            <a href="javascript:void(0)" @click="settingTpl(true)"><i class="iconfont bbs-shouji" style="font-size: 20px;margin-left: 10px"></i></a>
                        </div>
            </div>
            <!--文件树-->
            <el-tree :data="treeInfo" :props="defaultProps" 
            @node-click="handleNodeClick" 
            accordion :highlight-current="true"
              node-key="id"
              :default-expanded-keys="[0]"
            class="file-tree"></el-tree>
            <!--文件树-->
        </section>
        <!--文件列表-->
        <router-view  class="tree-list"></router-view>
    </div>
 </div>
</template>

<script>
 import * as fetch from '@/api/interface'
export default {
    data() {
        return {
            treeInfo: [{
                name: '模版根目录',
                path: '',
                child: [],
                 id:0
            }],
            defaultProps: {
                children: 'child',
                label: 'name',
                id: 'id'
            },
            root: ''
        };
    },
    methods: {
        getTemplateTree() {
            fetch.getTemplateTree({root:this.root })
                .then(res => {
                     
                       this.treeInfo[0].path=res.body.rootPath
                    this.treeInfo[0].child = res.body.resources;
                    setTimeout(()=>{
                    $('#refresh').removeClass('an-circle');
                    },500);
                    
                })
        },
        refresh(){
            $('#refresh').addClass('an-circle');
            this.getTemplateTree();
        },
        settingTpl(mobile){
             this.$router.push({
                    path: '/templatesetting',
                    query:{
                        mobile:mobile,
                        noceStr:Math.round(Math.random()*10)
                    }
                })
        },
        handleNodeClick(data) {
            //console.log(data);  
            let childType = typeof data.child;//判断类型
             $(window).scrollTop(0);
            if (childType == 'object') {
                let params=data.path;
                this.$router.push({
                    path: '/templatelist',
                    query:{
                        name:params,
                        noceStr:Math.round(Math.random()*10)
                    }
                })
            } else {
                this.$router.push({
                    path: '/templateedit',
                     query:{
                        id:data.path,
                        root:data.root,
                        type:'edit'
                    }
                })
            }
        },
        viewHeight(){
          var he=  $(window).height();
            he= parseInt(he-170);
            $('.js-height').css('minHeight',he+'px');
        }
    },
    mounted(){
        var self=this;
        $(function(){
                self.viewHeight();
        })
         window.onresize = function() {
            self.viewHeight();
        };
    },
    created: function() {
        this.$router.push({ path: '/templatelist'})
        this.getTemplateTree();
    }
};
</script>

<style scoped lang='scss'>


.forum-header a{
    color: #4c5f70;
}
.forum-header .bbs-iconfontdesktop{
   top:0;
   margin-right: 0;
}


</style>
