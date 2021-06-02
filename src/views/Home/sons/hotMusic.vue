<template>
  <div>
    <div class="hotBang">
      <span class="hotimg"></span>
      <p class="update-now">更新日期</p>
    </div>
    <!-- 排行榜 -->
    <div class="hotlist">
      <ul>
        <li v-for="(i,index) in TophotList" :key="index+5">
          <i style="float:left;color:#df3436">{{ index+1 }}</i>
          <p class="musicName">{{ i.name }}</p>
          <p style="font-size:12px;color:#888;">
            <span class="SQ"></span>
            {{ i.al.name }} - {{ i.ar[0].name }}
          </p>
          <!-- 播放 -->
          <i @click="palys(i.id,i.al.picUrl,i.name,i.ar[0].name)" class="goMusic"></i>
        </li>
      </ul>
    </div>
    <!-- 查看完整榜单 -->
    <div @click="openDown" class="allbangdan">查看完整榜单></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotlist: [], //热歌榜
      Toplist: [], //榜单全部歌曲 id
      ToplistId: [], //榜单top20 id
      TophotList: [], //榜单top20
    };
  },
  created() {
    this.hotList();
  },
  methods: {
    hotList() {
      this.$http
        .post("http://39.106.201.40:3000/playlist/detail?id=3778678")
        .then((res) => {
          console.log(res, "热歌榜 榜单");
          if (res.status == 200 && res.statusText == "OK") {
            this.hotlist = res.data.playlist;
            this.Toplist = res.data.playlist.trackIds;
            this.Toplist.slice(0, 20).forEach((n) => {
              this.ToplistId.push(n.id);
            });
            this.hos(this.ToplistId.join(","));
          }
        });
    },
    //热歌榜歌曲
    hos(ids) {
      this.$http
        .get("http://39.106.201.40:3000/song/detail?ids=" + ids)
        .then((res) => {
          console.log(res, "热歌榜前20 歌曲详情");
          if (res.status == 200 && res.statusText == "OK") {
            this.TophotList = res.data.songs;
          }
        });
    },
    //播放
    palys(id,img,playName,songName) {
      let obj = {
        path: "/play",
        query: {
          id: id,
          playImg: img,
          playName: playName,
          songName: songName,
        },
      };
      this.$router.push(obj);
    },
    //点击 下载
    openDown() {
      window.location =
        "https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fplaylist%2F3778678";
    },
  },
};
</script>

<style lang="less" scoped>
.hotBang {
  height: 145px;
  background: url("../../../assets/hot_music_bg.jpg") no-repeat;
  position: relative;
  background-size: cover;
  background-position: center;
  .hotimg {
    display: inline-block;
    width: 284px;
    height: 132px;
    background: url("../../../assets/index_icon.jpg") no-repeat;
    background-position: -24px -30px;
    background-size: 166px 97px;
    position: absolute;
    top: 20%;
    left: 5%;
  }
  .update-now {
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 70%;
    left: 5%;
  }
}
.hotlist {
  margin: 0 0 14px 0;
  font-size: 17px;
  line-height: 20px;
  color: #000;
  ul,
  li {
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
}
.allbangdan {
  height: 55px;
  line-height: 55px;
  text-align: center;
  color: #aaa;
}
</style>