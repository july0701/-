<template>
  <div>
    <audio
      @timeupdate="timeupdate_s"
      @ended="ended_s"
      class="audios"
      v-if="songsReal"
      :src="songsReal"
      ref="openS"
    ></audio>
    <!-- 背景图 -->
    <div class="bgc_bofang" :style="{'background-image':'url(' + playImg + ')'}"></div>
    <!-- 播放部分  -->
    <div @click="openMusic" class="play">
      <div class="songs">
        <i class="lock" v-if="!lock"></i>
        <img :src="playImg || playImgs" :class="{start : lock}" alt />
        <div class="playBox"></div>
      </div>
      <div class="player">
        <span style="width:70%;display:inline-block;font-size:18px;color:#fff;">
          <span style="color:#ff3a3a;">演</span>
          : {{songName}}
        </span>
        <span
          style="display:inline-block;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;width:70%;font-size:18px;color:#fff;"
        >
          <span style="color:#ff3a3a;">歌</span>
          : {{player}}
        </span>
      </div>
    </div>
    <!-- 歌词 -->
    <div class="lyric_area">
      <ul id="lyric" ref="lrc"></ul>
    </div>
    <!-- 底部 按钮 -->
    <div class="footer">
      <p @click="openDown" class="openThis">打开</p>
      <p @click="openDown" class="downLoad">下载</p>
    </div>
    <!-- logo -->
    <div class="logo">
      <img
        style="width:17px;height:17;"
        src="../../assets/u=1384651056,1496557090&fm=26&gp=0.jpg"
        alt
      />
      <p>网易云音乐</p>
    </div>
  </div>
</template>

<script>
var oLRC = {
  ti: "", //歌曲名
  ar: "", //演唱者
  al: "", //专辑名
  by: "", //歌词制作人
  offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
  ms: [], //歌词数组{t:时间,c:歌词}
};
var lineNo = 2; //当前行
var C_pos = 4; //C位
var offset = -20; //滚动距离（应等于行高）
export default {
  data() {
    return {
      songsUrl: [],
      playImg: null,
      player: null,
      songName: null,
      lock: false,
      songsReal: null,
      lyric: null, //歌词
      playImgs: null,
      lrc: null, //歌词
      // ids: null, //音乐id
    };
  },
  created() {
    this.getSongsurl();
    this.playImg = this.$route.query.playImg;
    this.player = this.$route.query.playName;
    this.songName = this.$route.query.songName;
    // this.ids = this.$route.query.id;
    
  },
  methods: {
    //获取音乐地址
    getSongsurl() {
      let id = this.$route.query.id;
      this.getThissong(id);
      this.$http.get("http://39.106.201.40:3000/song/url?id=" + id).then((res) => {
        console.log(res, "音乐的地址");
        if (res.status == 200 && res.statusText == "OK") {
          this.songsUrl = res.data.data;
          this.songsReal = this.songsUrl[0].url;
          this.getLyric(this.songsUrl[0].id);
        }
      });
    },
    //获取歌词
    getLyric(ids) {
      this.$http
        .get("http://39.106.201.40:3000/lyric?id=" + ids)
        .then((res) => {
          console.log(res, "歌词");
          if (res.status == 200 && res.statusText == "OK") {
            this.lyric = res.data.lrc.lyric;
            this.createLrcObj(res.data.lrc.lyric);
            this.showLRC();
          }
        });
    },
    //把获取的lrc歌词 用js转成数组
    createLrcObj(lrc) {
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(
          lrcs[i].indexOf("[") + 1,
          lrcs[i].indexOf("]")
        ); //取[]间的内容
        var s = t.split(":"); //分离:前后文字
        if (isNaN(parseInt(s[0]))) {
          //不是数值 [事件]
          for (var i in oLRC) {
            if (i != "ms" && i == s[0].toLowerCase()) {
              oLRC[i] = s[1];
            }
          }
        } else {
          //数值 [歌词]
          var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
          var start = 0;
          for (var k in arr) {
            start += arr[k].length; //计算歌词位置
          }
          var content = lrcs[i].substring(start); //获取歌词内容
          for (var k in arr) {
            var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
            var s = t.split(":"); //分离:前后文字
            oLRC.ms.push({
              //对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content,
            });
          }
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
    },
    //显示歌词
    showLRC() {
      let s = "";
      for (var i in oLRC.ms) {
        //遍历ms数组，把歌词加入列表
        s += "<li>" + oLRC.ms[i].c + "</li>";
      }
      document.getElementById("lyric").innerHTML = s;
    },
    //高亮显示歌词当前行及文字滚动控制
    lineHigh() {
      var lis = document.getElementsByTagName("li"); //歌词数组
      if (lineNo > 0) {
        lis[lineNo - 1].style.color = "#000"; //去掉上一行的高亮样式
      }
      lis[lineNo].style.color = "red"; //高亮显示当前行
      //文字滚动
      if (lineNo > C_pos) {
        this.$refs.lrc.style.transform =
          "translateY(" + (lineNo - C_pos) * offset + "px)"; //整体向上滚动一行高度
      }
    },
    //播放结束时回到初始位置
    goback() {
      this.$refs.lrc.style.transform = "translateY(0)";
      lineNo = 0;
    },
    //监听播放器的timeupdate事件
    timeupdate_s() {
      if (lineNo == oLRC.ms.length) return;
      var curTime = this.$refs.openS.currentTime; //audio 当前音乐播放时间
      if (parseFloat(oLRC.ms[lineNo].t) <= curTime) {
        this.lineHigh(); //高亮当前行
        lineNo++;
      }
    },
    //监听播放器的ended事件，播放结束时回滚歌词
    ended_s() {
      this.goback(); //回滚歌词
      this.lock = 'false';
      console.log(this.lock);
    },
    //获取当前点击歌曲的id
    getThissong(id) {
      this.$http
        .get("http://39.106.201.40:3000/song/detail?ids=" + id)
        .then((res) => {
          console.log(res, "点击当前歌曲的详细");
          if (res.status == 200 && res.statusText == "OK") {
            this.playImgs = res.data.songs[0].al.picUrl;
          }
        });
    },
    //播放按钮
    openMusic() {
      this.lock = !this.lock;
      if (this.lock) {
        this.$refs.openS.play();
      } else {
        this.$refs.openS.pause();
      }
    },
    //下载
    openDown() {
      window.location =
        "https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fplaylist%2F3778678";
    },
  },
};
</script>

<style lang="less" scoped>
.bgc_bofang {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  filter: blur(20px);
  -webkit-filter: blur(50px); /* chrome, opera */
  -ms-filter: blur(120px);
  -moz-filter: blur(120px);
  background-position: center;
  background-size: cover;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.play {
  position: relative;
  margin-top: 80px;

  .songs {
    width: 296px;
    height: 296px;
    margin: 0 auto;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      background: url("../../assets/needle-ip6.png") no-repeat;
      background-size: 100% auto;
      width: 110px;
      height: 157px;
      top: -80px;
      left: 125px;
    }
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 56px;
      height: 56px;
      background: url("../../assets/lock.png") no-repeat;
      background-size: 100% auto;
    }
    img {
      display: inline-block;
      width: 190px;
      height: 190px;
      background: orange;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-name: donghua;
      animation-duration: 10s;
      animation-play-state: paused;
      &.start {
        animation-play-state: running;
      }
      @keyframes donghua {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }
    .playBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: url("../../assets/disc-ip6.png") no-repeat;
      background-size: 100% auto;
    }
  }
}
.player {
  text-align: center;
  padding-top: 15px;
  width: 100%;
}
.footer {
  bottom: 1%;
  width: 100%;
  display: flex;
  position: fixed;
  font-size: 16px;
  justify-content: center;
  .openThis {
    width: 45%;
    padding: 10px 15px;
    background-color: transparent;
    border: 1px solid rgb(255, 58, 58);
    color: rgb(255, 58, 58);
    border-radius: 20px;
    text-align: center;
    margin: 0 10px;
  }
  .downLoad {
    width: 45%;
    padding: 10px 0;
    background-color: rgb(255, 58, 58);
    border: 1px solid rgb(255, 58, 58);
    color: #fff;
    border-radius: 20px;
    text-align: center;
  }
}

.logo {
  position: absolute;
  top: 1%;
  left: 1%;
  color: #fff;
  font-size: 12px;
  img {
    float: left;
  }
  p {
    float: left;
    margin-left: 8px;
  }
}

.lyric_area {
  width: 100%;
  height: 100px; /*歌词区域高度*/
  overflow: hidden; /*隐藏超出部分*/
  margin-top: 15px;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  #lyric {
    /*歌词列表*/
    width: 300px;
    margin: 0 auto;
    line-height: 20px; /*行高，这个值要用在歌词滚动距离上*/
    transition-duration: 800ms; /*滚动速度*/
    text-align: center;
  }
  #lyric .lineHigh {
    /*高亮行*/
    color: red;
  }
}
</style>