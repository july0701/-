<template>
  <div>
    <h3>最佳匹配</h3>
    <!-- 歌手 -->
    <div @click="goSinger(i.id,i.name)" v-for="(i,index) in singer" :key="index+32" class="singer">
      <div class="singer_con">
        <div class="singer_img">
          <img style="width:50px;height:50px" :src="i.img1v1Url" alt />
        </div>
        <div class="singer_name">
          <p>歌手：{{ i.name }}</p>
        </div>
        <van-icon color="#aaa" size="20px" name="arrow" />
      </div>
    </div>
    <!-- 专辑 -->
    <div @click="goAlbums(i.id)" v-for="(i,index) in Albums" :key="index+589" class="Album">
      <div class="Album_con">
        <div class="Album_img">
          <img style="width:50px;height:50px" :src="i.blurPicUrl" alt />
        </div>
        <div class="Album_name">
          <p
            style="width:180px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
          >专辑：{{ i.name }}</p>
          <p style="font-size:12px;color:#999;">{{ i.artist.name}}</p>
        </div>
        <van-icon color="#aaa" size="20px" name="arrow" />
      </div>
    </div>
    <!-- 歌曲 -->
    <ul class="songs">
      <li v-for="(i,index) in songs" :key="index+52">
        <p class="musicName">{{ i.name }}</p>
        <p style="font-size:12px;color:#888;">
          <span class="SQ"></span>
          {{ i.artists[0].name }} - {{ i.album.name }}
        </p>
        <i @click="palys(i.id,i.name,i.album.name)" class="goMusic"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      Albums: [], //专辑
      singer: [], //歌手
      ids: null,
      playImg:null
    };
  },
  created() {
    this.getTerms();
    this.getAlbum();
    this.getSinger();
  },
  methods: {
    //歌曲数据
    getTerms() {
      this.$http
        .get(
          "http://39.106.201.40:3000/search?limit=100&keywords=" +
            this.$store.state.kyesTerms
        )
        .then((res) => {
          console.log(res, "Terms");
          if (res.status == 200 && res.statusText == "OK") {
            this.songs = res.data.result.songs;
          }
        });
    },
   
    //专辑数据
    getAlbum() {
      this.$http
        .get(
          "http://39.106.201.40:3000/search?limit=1&keywords=" +
            this.$store.state.kyesTerms +
            "&type=10"
        )
        .then((res) => {
          console.log(res, "搜索关键字的 专辑数据");
          if (res.status == 200 && res.statusText == "OK") {
            this.Albums = res.data.result.albums;
          }
        });
    },
    //歌手数据
    getSinger() {
      this.$http
        .get(
          "http://39.106.201.40:3000/search?limit=1&keywords=" +
            this.$store.state.kyesTerms +
            "&type=100"
        )
        .then((res) => {
          console.log(res, "搜索关键字的 歌手数据");
          if (res.status == 200 && res.statusText == "OK") {
            this.singer = res.data.result.artists;
          }
        });
    },
    //播放
    palys(id,playName,songName) {
      let obj = {
        path: "/play",
        query: {
          id: id,
          playName: playName,
          songName: songName,
        },
      };
      this.$router.push(obj);
    },
    //跳转歌手详情
    goSinger(id){
      let obj = {
        path:'/singer',
        query:{
          id:id
        }
      }
      this.$router.push(obj)
      // this.$store.commit('getSinger',name)
    },
    //跳转专辑详情
    goAlbums(id){
      let obj = {
        path:'/albumslist',
        query:{
          id:id
        }
      }
      this.$router.push(obj)
    }
  },
};
</script>

<style lang="less" scoped>
h3 {
  font-weight: normal;
  font-size: 12px;
  padding-left: 5px;
}
.singer {
  padding: 8px 0;
  margin-left: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
  .singer_con {
    height: 50px;
    line-height: 50px;
    .van-icon-arrow {
      position: absolute;
      right: 4%;
      top: 33%;
    }
    .singer_img {
      width: 50px;
      height: 50px;
      float: left;
    }
    .singer_name {
      margin-left: 14px;
      float: left;
      font-size: 17px;
    }
  }
}
.Album {
  padding: 8px 0;
  margin-left: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
  .Album_con {
    height: 50px;
    .van-icon-arrow {
      position: absolute;
      right: 4%;
      top: 33%;
    }
    .Album_img {
      width: 50px;
      height: 50px;
      float: left;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 2px;
        right: -10px;
        width: 10px;
        height: 46px;
        background-repeat: no-repeat;
        background-size: 166px 97px;
        background-image: url("../../../assets/index_icon.jpg");
        background-position: 0 -30px;
      }
    }
    .Album_name {
      margin-left: 14px;
      float: left;
      font-size: 17px;
    }
  }
}
.songs {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding-left: 10px;
    border-bottom: 1px solid #eee;
    padding: 6px 10px;
    position: relative;
  }
  .goMusic {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    background: url("../../../assets/index_icon.jpg");
    background-repeat: no-repeat;
    background-position: -24px 0;
    background-size: 166px 97px;
  }
  .musicName {
    font-size: 17px;
  }
  .SQ {
    display: inline-block;
    margin-right: 4px;
    width: 12px;
    height: 8px;
    background: url("../../../assets/index_icon.jpg") no-repeat;
    background-size: 166px 97px;
  }
}
</style>