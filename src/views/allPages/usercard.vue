<template>
  <div>
    <!-- 顶部 -->
    <div :style="{'background-image' : 'url(' + bgcImg + ')'}" class="top">
      <div class="top_main">
        <div>
          <p style="color: #fff;">{{ listenSongs }}</p>
          <p style="color:hsla(0,0%,100%,.6)">听歌数</p>
        </div>
        <div style="position: relative;">
          <img
            style="width:80px;height:80px;border-radius:50%;background-color: #000;"
            :src="userImg"
            alt
          />
          <!-- icon -->
          <b
            ref="icon"
            :style="{'background-image' : 'url(' + identityIconUrl + ')' }"
            class="icon"
          ></b>
        </div>

        <div>
          <p style="color: #fff;">{{ beliked }}</p>
          <p style="color:hsla(0,0%,100%,.6)">粉丝数</p>
        </div>
      </div>
      <div class="top_f">
        <div class="username">
          <p style="font-size:18px;color:#fff;">{{ userName }}</p>
        </div>
        <div class="likeThis">+关注</div>
      </div>
    </div>
    <!-- 歌单 -->
    <div class="main">
      <h4>歌单({{ playlistCount }})</h4>
      <!-- 用户歌单 -->
      <div
        @click="goSonglist(i.id)"
        v-for="(i,index) in userSongList"
        :key="index+456"
        class="Song_list"
      >
        <div class="list">
          <div class="left">
            <img :src="i.coverImgUrl" alt />
          </div>
          <div class="right">
            <p
              style="width:90%;overflow:hidden;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{ i.name }}</p>
            <p style="font-size:12px;color:#999;">{{ i.trackCount }}首, 播放{{ i.playCount }}次</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部固定 收藏歌单 -->
    <div class="Collection">
      <div @click="openDown" class="Collection_con">
        <van-icon size="24px" name="music-o" />去TA的个人主页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listenSongs: 0, //听歌数
      userImg: null, //用户头像
      bgcImg: null, //背景图片
      userName: null, //用户名字
      beliked: null, //粉丝数
      playlistCount: null, //歌单数量
      userSongList: [], //用户歌单
      identityIconUrl: null, //用户右下icon
    };
  },
  created() {
    this.getUser();
    this.getSonglist();
  },
  methods: {
    //用户信息
    getUser() {
      let id = this.$route.query.id;
      this.$http
        .get("http://39.106.201.40:3000/user/detail?uid=" + id)
        .then((res) => {
          console.log(res, "用户信息");
          if (res.status == 200 && res.statusText == "OK") {
            this.listenSongs = res.data.listenSongs;
            this.userImg = res.data.profile.avatarUrl;
            this.bgcImg = res.data.profile.backgroundUrl;
            this.userName = res.data.profile.nickname;
            this.beliked = res.data.profile.followeds;
            this.playlistCount = res.data.profile.playlistCount;
            //判断 用户右下icon 是否有
            if (res.data.profile.avatarDetail == null) {
              this.$refs.icon.style.display = "none";
            } else {
              this.$refs.icon.style.display = "block";
              this.identityIconUrl =
                res.data.profile.avatarDetail.identityIconUrl; //获得icon地址
            }
          }
        });
    },
    //用户歌单
    getSonglist() {
      let id = this.$route.query.id;
      this.$http
        .get("http://39.106.201.40:3000/user/playlist?uid=" + id)
        .then((res) => {
          console.log(res, "用户歌单信息！！！！");
          if (res.status == 200 && res.statusText == "OK") {
            this.userSongList = res.data.playlist;
          }
        });
    },
    //跳转歌单详情页面
    goSonglist(id) {
      let obj = {
        path: "/Songlist",
        query: {
          id: id,
        },
      };
      this.$router.push(obj);
    },
    // 点击下载
    openDown() {
      window.location =
        "https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fplaylist%2F3778678";
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  padding: 13.4% 0;
  background: #000;
  text-align: center;
  background-size: cover;
  background-position: center;
  box-shadow: 6px 5px 80px 60px rgb(27, 27, 27) inset;
  .top_main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .icon {
      display: inline-block;
      width: 21px;
      height: 21px;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 69%;
      left: 71%;
    }
  }
  .top_f {
    .username {
      height: 20px;
      margin-top: 2%;
    }
    .likeThis {
      width: 126px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #eee;
      line-height: 30px;
      text-align: center;
      color: #fff;
      margin: 3% auto 0;
    }
  }
}
.main {
  margin-bottom: 60px;
  h4 {
    font-weight: 400;
    font-size: 12px;
    color: #666;
    height: 28px;
    padding-left: 3%;
    background: #eeeff0;
    line-height: 28px;
    margin-bottom: 3px;
  }
  .Song_list {
    .list {
      height: 56px;
      padding-left: 6px;
      display: flex;
      overflow: hidden;
      .left {
        width: 50px;
        height: 50px;
        margin-right: 10px;

        img {
          width: 50px;
          height: 50px;
        }
      }
      .right {
        width: 90%;
        height: 56px;
        padding: 3px 0 3px 0;
        font-size: 18px;
        color: #000;
      }
    }
  }
}
.Collection {
  width: 100%;
  padding: 7px 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .Collection_con {
    background: #ff3a3a;
    color: #fff;
    font-size: 16px;
    border-radius: 36px;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>