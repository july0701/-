<template>
  <div>
    <div class="singer_Top">
      <img v-for="(i,index) in singer_img" :key="index+259" class="singer_bg" :src="i.picUrl" alt />
      <div class="singer_info">
        <p style="font-size:19px;color:#fff;">{{ singerName }}</p>
        <p style="color:#fff;font-size:12px;margin-top:7%;">昵称：{{ singerName }}</p>
      </div>
    </div>
    <!-- 歌手简介 -->
    <div class="singer_Int">
      <h2>歌手简介</h2>
    </div>
    <!-- 详细信息 -->
    <div class="info">
      <p ref="all" class="briefDesc">{{ briefDesc }}</p>
      <!-- 完整歌手介绍 -->
      <div ref="keys" @click="lookAll(flag)" class="all">收起</div>
    </div>
    <!-- 热门歌曲 -->
    <div class="singer_Int">
      <h2>热门单曲</h2>
    </div>
    <!-- 热门歌曲列表 -->
    <ul class="real_list">
      <li
        @click="palys(i.id,i.al.picUrl,i.name,i.ar[0].name)"
        v-for="(i,index) in songs"
        :key="index+74"
      >
        <div class="lf">{{ index+1 }}</div>
        <div class="lr">
          <p
            style="width:80%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:17px;color:#333;"
          >{{ i.name }}</p>
          <p
            style="width:90%;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:12px;"
          >
            <span>{{ i.ar[0].name}}</span>
            &nbsp;-
            <span>{{ i.al.name }}</span>
          </p>
          <i class="goMusic"></i>
        </div>
      </li>
    </ul>
    <!-- 最新音乐 -->
    <div class="singer_Int">
      <h2>最新音乐</h2>
    </div>
    <!-- 最新音乐专辑歌单 -->
    <div class="lastSong_new">
      <div @click="goalbumslist(i.id)" v-for="(i,index) in lastSingerAlbums" :key="index+324" class="Album">
        <div class="Album_con">
          <div class="Album_img">
            <img style="width:80px;height:80px" :src="i.picUrl" alt />
          </div>
          <div class="Album_name">
            <p
              style="width:180px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{ i.name }}</p>
            <p style="font-size:12px;color:#999;">{{ i.artists[0].name }}</p>
            <p style="font-size:12px;color:#999;margin-top:9%;">{{ i.size }}首 {{ publishTime[0] }}</p>
          </div>
          <van-icon color="#aaa" size="20px" name="arrow" />
        </div>
      </div>
    </div>
    <!-- 影响力 -->
    <div class="singer_Int Influence">
      <div class="h2"><span>影响力</span><span class="Influence_icon"></span></div>
    </div>
    <div class="Influence_info">
      <div class="Influence_top">
        <p>
          <van-icon size="12" name="fire-o" />
          <span style="margin:0 5px;">歌手热度</span>
          <span>歌手榜地区排名</span>
          <van-icon size="12" name="arrow" />
        </p>
        <p style="margin-top:18px;">
          <van-icon size="12" name="award-o" />
          <span style="margin:0 5px;">歌曲进入云音乐官方榜**次</span>
          <van-icon size="12" name="arrow" />
        </p>
      </div>
      <div class="Influence_main">
        <!-- 左侧图片 -->
        <div class="Influence_main_lf">
          <img src alt />
        </div>
        <!-- 右侧数据 -->
        <ul class="Influence_main_rg">
          <li>
            <span
              style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#000;position: absolute;left:0px;top:8px;"
            ></span>
            <span style="margin-left:10px;">正在人气打榜，人气值11143130，当前排名14</span>
          </li>
          <li>
            <span
              style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#000;position: absolute;left:0px;top:8px;"
            ></span>
            <span style="margin-left:10px;">正在人气打榜，人气值11143130，当前排名14</span>
          </li>
          <li>
            <span
              style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#000;position: absolute;left:0px;top:8px;"
            ></span>
            <span style="margin-left:10px;">正在人气打榜，人气值11143130，当前排名14</span>
          </li>
        </ul>
        <!-- 打榜按钮 -->
        <div class="bit">打榜</div>
      </div>
      <div class="Influence_footer">
        <!-- 左侧图片 -->
        <div class="Influence_main_lf">
          <img src alt />
        </div>
        <!-- 右侧数据 -->
        <ul class="Influence_main_rg">
          <li>
            <span
              style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#000;position: absolute;left:0px;top:8px;"
            ></span>
            <span style="margin-left:10px;">正在人气打榜，人气值11143130，当前排名14</span>
          </li>
          <li>
            <span
              style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#000;position: absolute;left:0px;top:8px;"
            ></span>
            <span style="margin-left:10px;">正在人气打榜，人气值11143130，当前排名14</span>
          </li>
          <li>
            <span
              style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#000;position: absolute;left:0px;top:8px;"
            ></span>
            <span style="margin-left:10px;">正在人气打榜，人气值11143130，当前排名14</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部固定 -->
    <div class="Collection">
      <div @click="openDown" class="Collection_con">
        <van-icon size="24px" name="music-o" />下载热门歌曲</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      briefDesc: null, //歌手简介
      flag: false,
      songs: [], //歌手热门歌曲
      singer_img: [], //歌手照片
      singerName: null, //歌手名字
      lastSingerAlbums: [], //歌手最新专辑
      publishTime: [], //专辑发行的时间
    };
  },
  created() {
    this.getSinger_info();
    this.getSinger_songs();
    this.getlastSingerAlbums();
    this.getSingerList();
  },
  methods: {
    //获取歌手简介
    getSinger_info() {
      let id = this.$route.query.id;
      this.$http
        .get("http://39.106.201.40:3000/artist/desc?id=" + id)
        .then((res) => {
          console.log(res, "歌手简介");
          if (res.status == 200 && res.statusText == "OK") {
            this.briefDesc = res.data.briefDesc;
            if (res.data.briefDesc == "") {
              this.$refs.keys.style.display = "none";
            }
          }
        });
    },
    //获取歌手热门50首歌曲
    getSinger_songs() {
      let id = this.$route.query.id;
      this.$http
        .get("http://39.106.201.40:3000/artist/top/song?id=" + id)
        .then((res) => {
          console.log(res, "歌手热门50首歌曲");
          if (res.status == 200 && res.statusText == "OK") {
            this.songs = res.data.songs.slice(0, 5);
            this.singerName = res.data.songs[0].ar[0].name;
            this.getSinger_singer(res.data.songs[0].ar[0].name); //调用歌手数据
          }
        });
    },
    //获取歌手榜
    getSingerList() {
      this.$http.post("http://39.106.201.40:3000/toplist/artist").then((res) => {
        console.log(res, "歌手排行榜");
      });
    },
    //歌手数据
    getSinger_singer() {
      this.$http
        .get(
          "http://39.106.201.40:3000/search?limit=1&keywords=" +
            this.singerName +
            "&type=100"
        )
        .then((res) => {
          console.log(res, "搜索关键字的 歌手数据");
          if (res.status == 200 && res.statusText == "OK") {
            this.singer_img = res.data.result.artists;
          }
        });
    },
    //获取歌手专辑
    getlastSingerAlbums() {
      let id = this.$route.query.id;
      this.$http
        .get("http://39.106.201.40:3000/artist/album?limit=1&id=" + id)
        .then((res) => {
          console.log(res, "歌手专辑");
          if (res.status == 200 && res.statusText == "OK") {
            this.lastSingerAlbums = res.data.hotAlbums;
            res.data.hotAlbums.forEach((n) => {
              this.getLocalTime(n.publishTime);
            });
          }
        });
    },
    //查看完整歌手信息
    lookAll(flag) {
      if (this.flag == true) {
        this.$refs.all.style.height = "";
        this.$refs.keys.innerHTML = "收起";
        this.flag = false;
      } else {
        this.$refs.all.style.height = "63px";
        this.$refs.keys.innerHTML = "完整歌手介绍";
        this.flag = true;
      }
    },
    //播放
    palys(id, img, playName, songName) {
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
    //转换时间戳
    getLocalTime(nS) {
      let timeStr = nS.toString();
      let time_real = timeStr.substring(0, 10);
      this.publishTime.push(
        new Date(parseInt(time_real) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, "")
      );
    },
    //跳转专辑列表
    goalbumslist(id){
      let obj = {
        path:'/albumslist',
        query:{
          id:id
        }
      }
      this.$router.push(obj)
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
.singer_Top {
  position: relative;

  .singer_bg {
    width: 100%;
    -webkit-filter: brightness(
      50%
    ); /*考虑浏览器兼容性：兼容 Chrome, Safari, Opera */
    filter: brightness(80%);
    background-color: #000;
  }
  .singer_info {
    width: 150px;
    height: 125px;
    position: absolute;
    top: 50%;
    left: 4%;
  }
}
.singer_Int {
  h2 {
    position: relative;
    font-size: 18px;
    z-index: 2;
    margin-top: -5px;
    padding: 15px;
    background: #fff;
    font-weight: 700;
    color: #000;
  }
}
.info {
  //   height: 127px;
  padding: 0 16px 18px 16px;
  border-bottom: 8px solid #fcfcfd;
  .briefDesc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .all {
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-top: 25px;
  }
}
.real_list {
  list-style: none;
  border-bottom: 8px solid #fcfcfd;
  li {
    height: 55px;
    position: relative;
    .lf {
      width: 40px;
      height: 55px;
      line-height: 55px;
      float: left;
      text-align: center;
      font-size: 16px;
      color: #999;
    }
    .lr {
      width: 89%;
      height: 55px;
      padding-top: 8px;
      float: left;
      //   border-bottom: 1px solid #eee;
      .goMusic {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        background: url("../../assets/index_icon.jpg");
        background-repeat: no-repeat;
        background-position: -24px 0;
        background-size: 166px 97px;
      }
      span {
        color: #888;
      }
    }
  }
}
.lastSong_new {
  width: 100%;
  border-bottom: 8px solid #fcfcfd;
  .Album {
    border-bottom: 8px solid #fcfcfd;
    padding: 8px 0;
    margin-left: 10px;
    border-bottom: 1px solid #eee;
    position: relative;
    .Album_con {
      height: 80px;
      .van-icon-arrow {
        position: absolute;
        right: 4%;
        top: 33%;
      }
      .Album_img {
        width: 80px;
        height: 80px;
        float: left;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          right: -10px;
          width: 90px;
          height: 100%;
          background-repeat: no-repeat;
          background-image: url("../../assets/album@3x.png");
          background-position: center;
          background-size: contain;
        }
      }
      .Album_name {
        margin-left: 6%;
        float: left;
        height: 80px;
        font-size: 15px;
      }
    }
  }
}
.Influence {
  padding: 15px;
  .h2{
    position: relative;
    height: 28px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    padding: 3px 0;
    span{
      display: inline-block;
      height: 28px;
      width: 54px;
      line-height: 28px;
    }
    .Influence_icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("../../assets/downicon.png");
    background-size: cover;
    background-position: center;
    line-height: 20px;
    position: absolute;
    top: 6px;
    left: 58px;
  }
  }
}
.Influence_info {
  padding: 0 15px;
  margin-bottom: 80px;
  .Influence_top {
    p {
      font-size: 14px;
      font-weight: bold;
      color: #000;
    }
  }
  .Influence_main {
    height: 100px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.03);
    display: flex;
    overflow: hidden;
    position: relative;
    .Influence_main_lf {
      height: 80px;
      width: 80px;
      border-radius: 6px;
      background: #000;
      img {
        height: 80px;
        width: 80px;
      }
    }
    .Influence_main_rg {
      list-style: none;
      margin-left: 8px;
      padding: 5px 0;
      li {
        position: relative;
        width: 65%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
      }
    }
    .bit {
      width: 50px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 33px;
      background-image: linear-gradient(-90deg, #ff5a4c, #ff1d12);
      position: absolute;
      top: 66%;
      right: 10px;
      color: #fff;
    }
  }
  .Influence_footer {
    height: 100px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.03);
    display: flex;
    overflow: hidden;
    position: relative;
    .Influence_main_lf {
      height: 80px;
      width: 80px;
      border-radius: 6px;
      background: #000;
      img {
        height: 80px;
        width: 80px;
      }
    }
    .Influence_main_rg {
      list-style: none;
      margin-left: 8px;
      padding: 5px 0;
      li {
        position: relative;
        width: 65%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
  background-color: #fff;
  z-index: 999;
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