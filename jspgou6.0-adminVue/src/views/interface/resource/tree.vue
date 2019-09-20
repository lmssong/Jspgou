<template>
 <div class="forum-module">
        <div class="forum-header">
             <span class="forum-name">资源列表</span>
    </div>
     <div class="tree-layout">
        <!--文件夹-->
        <section class="file-tree-items">
            <div class="forum-header" style="background:#fff;border-bottom:none">
                <a href="javascript:void(0)" class="pull-left" @click="refresh"  style="color:#4c5f70" id="refresh">
                    <i class="iconfont bbs-refurbish" style="font-size: 20px"></i> 
                    &nbsp;                   
                </a>
                  <span style="padding-left:5px;color:#4c5f70">
                   刷新     
                </span>
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
                name: '根目录',
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
        getResourceTree() {
            fetch.getResourceTree({root:this.root })
                .then(res => {
                     //console.log(res);
                       this.treeInfo[0].path=res.body.rootPath
                    this.treeInfo[0].child = res.body.resources;
                     setTimeout(()=>{
                    $('#refresh').removeClass('an-circle');
                    },1000);
                })
        },
        refresh(){
             $('#refresh').addClass('an-circle');
             this.getResourceTree();
        },
        handleNodeClick(data) {
                $(window).scrollTop(0);
            let childType = typeof data.child;//判断类型
            if (childType == 'object') {
                let params=data.path;
                this.$router.push({
                    path: '/resourcelist',
                    query:{
                        name:params,
                        noceStr:Math.round(Math.random()*10)
                    }
                })
            } else {
                this.$router.push({
                    path: '/resourceedit',
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
    created: function() {
        this.$router.push({ path: '/resourcelist'})
        this.getResourceTree();
    },
    mounted(){
        var self=this;
        $(function(){
                self.viewHeight();
        })
         window.onresize = function() {
            self.viewHeight();
        };
    }
};
</script>

<style scoped lang='scss'>
.tree {
    width: 15%;
    display: inline-block;
    float: left;
    padding-bottom: 99999px;
    margin-bottom: -99999px;
}
.right-view{
     padding-bottom: 99999px;
    margin-bottom: -99999px;
    display: inline-block;
    
    width:85%;
}
.el-tree {
    border: none;
     padding-left: 19px;
}

</style>
