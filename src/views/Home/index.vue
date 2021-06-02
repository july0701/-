<template>
  <div>
    <div class="header-logo">
      <img src="../../assets/01.gif" alt />
      <div class="download">下载</div>
    </div>
    <div class="main">
      <van-tabs v-model="active">
        <van-tab title="推荐"><Recommended></Recommended></van-tab>
        <van-tab title="热歌榜"><hotMusic></hotMusic></van-tab>
        <van-tab to='/search' title="搜索"><router-view></router-view></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Recommended from './sons/Recommended'
import hotMusic from './sons/hotMusic'
export default {
    components:{
        Recommended,
        hotMusic,
    },
    data(){
        return{
            active:0
        }
    },
    methods:{
     
    }
};
</script>

<style lang="less" scoped>
.header-logo {
  width: 100%;
  height: 84px;
  background: #d43c33;
  line-height: 84px;
  z-index: 999;
  img {
    position: absolute;
    top: 30px;
    left: 8px;
  }
  .download {
    width: 100px;
    height: 36px;
    border-radius: 20px;
    background: #fff;
    position: absolute;
    top: 24px;
    right: 12px;
    margin: 0;
    line-height: 36px;
    color: #d43c33;
    font-size: 16px;
    text-align: center;
  }
}
.main{
    &/deep/.van-tabs__wrap{
      border-bottom: 1px solid #eee;
    }
    &/deep/.van-tab--active{
        color: #d43c33;
        
    }
     &/deep/.van-tab{
         font-size: 15px;
     }
}
</style>