<template>
  <div>
    <div class="search_box">
      <div class="search_row">
        <van-icon size="16px" name="search" />
        <input
          @keyup.enter="searchKeys"
          @click="searchReal"
          v-model="$store.state.kyesTerms"
          ref="name"
          class="search_real"
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
        />
        <van-icon @click="closeIt" size="16px" name="close" />
      </div>
    </div>

    <!-- 热门 -->
    <router-view></router-view>
    <div ref="s" class="search_hot">
      <h3>热门搜索</h3>
      <ul>
        <li
          @click="goHotTerms(i.first)"
          v-for="(i,index) in Hotsearch_terms"
          :key="index+9"
        >{{ i.first }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Hotsearch_terms: [],
      search_key: [],
    };
  },
  created() {
    this.getSearch();
  },
  methods: {
    //搜索热词
    getSearch() {
      this.$http.post("http://39.106.201.40:3000/search/hot").then((res) => {
        console.log(res, "搜索数据");
        if (res.status == 200 && res.statusText == "OK") {
          this.Hotsearch_terms = res.data.result.hots;
        }
      });
    },
    searchKeys() {
      let keys = this.$refs.name.value
      this.$store.commit('getTerms',keys)
      this.$router.push('/searchTerms')
      this.$refs.s.style.display = "none";
  
    },
    searchReal(){
      this.$router.push('/searchReal')
      this.$refs.s.style.display = "none";
    },
    closeIt(){
      this.$router.push('/search')
      this.$refs.s.style.display = "block";
    },
    //热词点击事件
    goHotTerms(Terms) {
      this.$refs.name.value = Terms;
      let keys = this.$refs.name.value
      this.$router.push("/searchTerms");
      this.$refs.s.style.display = "none";
      this.$store.commit('getTerms',keys)
    },
  },
};
</script>

<style lang="less" scoped>
.search_box {
  height: 60px;
  border-bottom: 1px solid #eee;
  background: #fbfcfd;
  display: flex;
  justify-content: center;
  align-items: center;
  .search_row {
    background: #ebecec;
    border-radius: 30px;
    height: 30px;
    width: 94.66%;
    padding: 0 30px;
    position: relative;
    .van-icon-search {
      position: absolute;
      left: 7px;
      top: 25%;
    }
    .van-icon-close{
      position: absolute;
      right: 8px;
      top: 29%;
    }
    .search_real {
      width: 100%;
      background: #ebecec;
      border: 0;
      height: 30px;
    }
  }
}
.search_hot {
  height: 197px;
  background-color: #fbfcfd;
  padding: 8px;
  h3 {
    font-size: 12px;
    font-weight: normal;
  }
  ul {
    list-style: none;
    li {
      display: inline-block;
      cursor: pointer;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid #eaebee;
      border-radius: 15px;
    }
  }
}

</style>