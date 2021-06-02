<template>
  <div>
    <div ref="keys" class="search_key">
      <h3>搜索</h3>
      <ul>
        <li v-for="(i,index) in search_key" :key="index+111">
          <van-icon size="18px" name="search" />
          {{ i.keyword }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            search_key: [],
        }
    },
    created(){
        if(this.$store.state.kyesTerms !== null){
             this.getsearchKey();
        }
       
    },
    methods:{
        getsearchKey() {
      this.$http
        .get(
          "http://39.106.201.40:3000/search/suggest?keywords= " +
            this.$store.state.kyesTerms +
            "&type=mobile"
        )
        .then((res) => {
          console.log(res, "关键词数据");
          if (res.status == 200 && res.statusText == "OK") {
            this.search_key = res.data.result.allMatch;
          }
        });
    },
    }
};
</script>

<style lang="less" scoped>
.search_key {
  background: #fbfcfd;
//   position: fixed;
//   left: 0;
//   top: 23%;
  width: 100%;
  h3 {
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;
    font-weight: normal;
    border-bottom: 1px solid #eee;
  }
  li {
    height: 50px;
    border-bottom: 1px solid #eee;
    line-height: 50px;
  }
}
</style>