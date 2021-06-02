<template>
  <div>
    <!-- 推荐歌单 -->
    <div class="Recommended-music">
      <p class="titles">推荐歌单</p>
      <div style="display:flex;flex-wrap: wrap;">
        <div @click="goTuijian(i.id)" v-for=" (i,index) in Recommended_music" :key="index" class="musicCard">
          <img :src="i.picUrl" alt />
          <span>
            <van-icon name="audio" />
            {{ i.playCount }}
          </span>
          <p>{{ i.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="Latest-music">
      <p class="titles">最新音乐</p>
      <ul>
        <li v-for="(i,index) in Latest_music" :key="index+3">
          <p class="musicName">{{ i.name }}</p>
          <p style="font-size:12px;color:#888;">
            <span class="SQ"></span>
            {{ i.song.artists[0].name }} - {{ i.name }}
          </p>
          <!-- 播放 -->
          <i @click="palys(i.id,i.picUrl,i.song.artists[0].name,i.name)" class="goMusic"></i>
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <div @click="openDown" class="footer">
      <p
        style="display:flex;width: 230px;height:44px;font-size:30px;font-weight:500;color:#000;margin:15px auto;line-height: 44px;"
      >
        <!-- <span style="width:44px;height:44px;display:inline-block;"> -->
          <img
            style="width:44px;height:44px;"
            src="../../../assets/u=1384651056,1496557090&fm=26&gp=0.jpg"
            alt
          />
        <!-- </span> -->
        <span style="line-height:44px;height:44px;display:inline-block;">网易云音乐</span>
      </p>
      <div class="open">
        <p>打开APP，发现更多音乐 ></p>
      </div>
      <p style="fonnt-size:10px;color:#888;transform: scale(.7);">网易公司版权所有©1997-2020 杭州乐读科技有限公司运营</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Recommended_music: [],
      Latest_music: [],
    };
  },
  created() {
    this.getlist();
    this.getNewlist();
    this.getnow()
  },
  methods: {
    //获取数据 推荐歌单
    getlist() {
      this.$http
        .post("http://39.106.201.40:3000/personalized?limit=6")
        .then((res) => {
          console.log(res,'推荐歌单（6条数据）');
          if ((res.status = 200)) {
            this.Recommended_music = res.data.result;
            this.Recommended_music.forEach((n) => {
              if (n.playCount > 10000) {
                let wan = n.playCount / 10000;
                n.playCount = wan.toFixed(1) + "万 ";
                if (wan > 10000) {
                  let yi = wan / 10000;
                  n.playCount = yi.toFixed(1) + "亿";
                }
              }
            });
          }
        });
    },
    //获取数据 最新音乐
    getNewlist() {
      this.$http
        .post("http://39.106.201.40:3000/personalized/newsong")
        .then((res) => {
          console.log(res,'最新音乐数据');
          if (res.status == 200 && res.statusText == "OK") {
            this.Latest_music = res.data.result;
          }
        });
    },
    //推荐歌单路由跳转
    goTuijian(id){
      let obj ={
        path:'/Songlist',
        query:{
          id:id,
        }
      }
      this.$router.push(obj)
    },
    //shi
    getnow(){
      this.$http.post("http://39.106.201.40:3000/toplist").then( res => {
        console.log(res,'找数据专用');

      })
    },
    //play
    palys(id,img,playName,songName){
      let obj ={
        path:'/play',
        query:{
          id:id,
          playImg:img,
          playName:playName,
          songName:songName
        }
      }
      this.$router.push(obj)
    },
    //点击下载
    openDown(){
      window.location = 'https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fplaylist%2F3778678'
    }
  },
};
</script>

<style lang="less" scoped>
.Recommended-music {
  margin: 20px 0 14px 0;
  font-size: 17px;
  .titles {
    height: 20px;
    border-left: 2px solid#d43c33;
    padding-left: 9px;
    line-height: 20px;
    margin-bottom: 14px;
  }
  .musicCard {
    flex: 30%;
    margin: 0 0 12px 0;
    position: relative;
    &:nth-child(2),
    &:nth-child(5) {
      margin: 0 3px 12px 3px;
    }
    img {
      width: 100%;
     
    }
    p {
      font-size: 12px;
      color: #000;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding: 0 2px 0 6px;
      margin: 0;
    }
    span {
      position: absolute;
      right: 5px;
      top: 2px;
      font-size: 12px;
      color: #fff;
      &/deep/.van-icon {
        top: 2px;
      }
    }
  }
}
.Latest-music {
  margin: 20px 0 14px 0;
  font-size: 17px;
  line-height: 20px;
  color: #000;
  .titles {
    padding-left: 9px;
    height: 20px;
    border-left: 2px solid#d43c33;
    margin-bottom: 22px;
  }
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
.footer {
  background: url("../../../assets/recommand_bg_2x.png") no-repeat;
  height: 202px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  padding: 0 30px;
  text-align: center;
  .open {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d33a31;
    border-radius: 38px;
    font-size: 16px;
    color: #d33a31;
    // margin: 15px 37px 5px;
    text-align: center;
  }
}
</style>