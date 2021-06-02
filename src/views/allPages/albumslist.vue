<template>
  <div>
    <div class="Cover">
      <div :style="{'background-image' : 'url(' + albums_info.blurPicUrl + ')'}" class="cover_bg"></div>
      <div class="main">
        <div style="position: relative;">
          <img class="coverImgUrl" :src="albums_info.blurPicUrl" alt />
          <span class="coverImgUrl_bg"></span>
          <b class="top_icons">专辑</b>
        </div>

        <div class="gedanname">
          <p style="font-size: 17px;">{{ albums_info.name }}</p>
          <p style="position:relative;margin-top:23%;width:200px;height:30px;line-height:30px;">
            <span style="color:#dedede;margin-right:5px;">歌手:</span>
            <span>{{ albums_info_name }}</span>
          </p>
          <p style="color:#dedede;position:relative;width:200px;">
            <span style="margin-right:5px;">发行时间:</span>
            <span>{{ time_albums[0] }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 专辑简介 -->
    <div class="albums_introduction">
      <p>简介: {{ albums_info.description }}</p>
    </div>
    <div class="gedanlist">歌单列表</div>
    <!-- 歌单 歌曲列表 -->
    <div class="list_top">
      <ul class="real_list">
        <li
          @click="palys(i.id,i.al.picUrl,i.name,i.ar[0].name)"
          v-for="(i,index) in albums_songs"
          :key="index+72"
        >
          <div class="lf">{{ index+1 }}</div>
          <div class="lr">
            <p
              style="font-size:17px;color:#000;width:80%;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{ i.name }}</p>
            <p style="width:90%;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">
              <span>{{ i.ar[0].name}}</span>
              &nbsp;-
              <span>{{ i.al.name }}</span>
            </p>
            <i class="goMusic"></i>
          </div>
        </li>
      </ul>
    </div>
    <!-- 评论 -->
    <div class="Comments">
      <!-- 热评 -->
      <div ref="Great_reviews" class="Great_reviews">
        <h4>精彩评论</h4>
      </div>
      <!-- 精彩评论 -->
      <div v-for="(i,index) in hotComments" :key="index+154" class="user_comments">
        <div class="user_img">
          <div style="position: relative;width:30px;height:30px;">
            <img @click="gouserCard(i.user.userId)" :src="i.user.avatarUrl" alt />
            <!-- 精彩评论 用户头像右下icon -->
            <b
              ref="userimgicon"
              class="user_img_icon"
              :style="{'background-image' : 'url(' + hotcomment_icon[index] + ')'}"
            ></b>
          </div>
        </div>
        <div class="comments_Real">
          <p style="font-size:14px;color:#666;">{{ i.user.nickname}}</p>
          <p style="font-size:9px;color:#999;">{{ time_hot[index] }}</p>
          <p
            :style="{'display' : i.beReplied.length !== 0 ? 'none' : 'block'}"
            style="font-size:15px;color:#333;"
          >{{ i.content }}</p>
          <div :style="{'display' : i.beReplied.length !== 0 ? 'block' : 'none'}" class="replay">
            <p style="font-size:15px;">
              回复
              <span style="font-size:15px;color:#507daf;">@{{ replayName[index] }}:</span>
              {{ i.content }}
            </p>
            <p
              style="width:99%;padding:10px;margin:5px 0;font-size:14px;color:#888;border:1px solid #eee;"
            >{{ replayComment[index] }}</p>
          </div>
          <p @click="openDown" class="p4">
            <span>{{ i.likedCount }}</span>
            <van-icon size="18px" name="good-job-o" />
          </p>
        </div>
      </div>
      <div class="Latest_comments">
        <h4>
          最新评论
          <span>({{ totalcomments }})</span>
        </h4>
      </div>
      <!-- 最新评论 -->
      <div v-for="(i,index) in lastComments" :key="index+95" class="user_comments_last">
        <div class="user_img">
          <div style="position: relative;width:30px;height:30px;">
            <img @click="gouserCard(i.user.userId)" :src="i.user.avatarUrl" alt />
            <!-- 精彩评论 用户头像右下icon -->
            <b
              ref="userimgicon2"
              class="user_img_icon"
              :style="{'background-image' : 'url(' + lastcomment_icon[index] + ')'}"
            ></b>
          </div>
        </div>
        <div class="comments_Real">
          <p style="font-size:14px;color:#666;">{{ i.user.nickname}}</p>
          <p style="font-size:9px;color:#999;">{{ time_last[index] }}</p>
          <p
            :style="{'display' : i.beReplied.length !== 0 ? 'none' : 'block'}"
            style="font-size:15px;color:#333;"
          >{{ i.content }}</p>
          <div :style="{'display' : i.beReplied.length !== 0 ? 'block' : 'none'}" class="replay">
            <p style="font-size:15px;color:#000;">
              回复
              <span style="font-size:15px;color:#507daf;">@{{ replayName_last[index] }}：</span>
              {{ i.content }}
            </p>
            <p
              style="width:99%;padding:10px;margin:5px 0;font-size:14px;color:#888;border:1px solid #eee;"
            >{{ replayComment_last[index] }}</p>
          </div>
          <p @click="openDown" class="p4">
            <span>{{ i.likedCount }}</span>
            <van-icon size="18px" name="good-job-o" />
          </p>
        </div>
      </div>
      <!-- look All -->
      <div @click="openDown" class="lookAll">
        查看全部
        <span>{{ totalcomments }}</span>条评论 >
      </div>
    </div>
    <!-- 底部固定 收藏专辑 -->
    <div class="Collection">
      <div @click="openDown" class="Collection_con">
        <van-icon size="24px" name="music-o" />收藏专辑
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albums_info: [], //专辑信息
      albums_info_name: null, //歌手名字
      time_albums: [], //专辑发行时间
      albums_songs: [], //专辑歌曲
      hotComments: [], //精彩评论
      lastComments: [], //最新评论
      totalcomments: 0, //评论总数
      replayName: [], //包含回复人名字 精彩评论
      replayName_last: [], //最新评论人的 名字
      replayComment: [], //精彩评论 回复的消息
      replayComment_last: [], //最新评论 回复消息
      time_hot: [], //精彩评论 时间数组
      time_last: [], //最新评论 时间数组
      hotcomment_icon: [], //精彩评论头像 小图标
      lastcomment_icon: [], //最新评论头像 小图标
    };
  },
  created() {
    this.getalbums_info();
  },
  methods: {
    //获取专辑信息
    getalbums_info() {
      let id = this.$route.query.id;
      this.$http.get("http://39.106.201.40:3000/album?id=" + id).then((res) => {
        console.log(res, "专辑信息");
        if (res.status == 200 && res.statusText == "OK") {
          this.albums_info = res.data.album;
          this.albums_info_name = res.data.album.artist.name;
          this.getLocalTime(res.data.album.publishTime);
          this.albums_songs = res.data.songs;
          this.getComments(res.data.album.id);
        }
      });
    },
    //获取评论
    getComments(listId) {
      this.$http
        .post("http://39.106.201.40:3000/comment/album?id=" + listId)
        .then((res) => {
          console.log(res, "歌单评论数据");
          if (res.status == 200 && res.statusText == "OK") {
            this.hotComments = res.data.hotComments;
            this.lastComments = res.data.comments;
            this.totalcomments = res.data.total;
            //循环精彩评论
            res.data.hotComments.forEach((n) => {
              //调用 时间戳方法
              this.getLocalTime_comment(n.time);
              //获取replayName,replayComment数组
              if (n.beReplied.length > 0) {
                //if 有回复在replayName中push(回复人的名字)
                this.replayName.push(n.beReplied[0].user.nickname);
                if (n.beReplied[0].content !== null) {
                  //判断当前的回复 是否为空
                  this.replayComment.push(n.beReplied[0].content);
                } else {
                  this.replayComment.push("该评论已删除"); //if 为空 就push("该评论已删除")
                }
              } else {
                this.replayName.push(null); //if 没有回复就push（null）
                this.replayComment.push(null); //if 当前没有回复，在评论数组push（null）
              }
              //精彩评论 用户右下icon
              if (n.user.avatarDetail !== null) {
                this.hotcomment_icon.push(n.user.avatarDetail.identityIconUrl);
              } else {
                this.hotcomment_icon.push(null);
              }
            });
            //循环最新评论
            res.data.comments.forEach((s) => {
              //调用 时间戳方法
              this.getLocalTime1(s.time);
              //获取replayName_last,replayComment_last数组
              if (s.beReplied.length > 0) {
                this.replayName_last.push(s.beReplied[0].user.nickname);
                if (s.beReplied[0].content == null) {
                  this.replayComment_last.push("该评论已删除");
                } else {
                  this.replayComment_last.push(s.beReplied[0].content);
                }
              } else {
                this.replayName_last.push(null);
                this.replayComment_last.push(null); //if 当前没有回复，在评论数组push（null）
              }
              //最新评论 用户右下icon
              if (s.user.avatarDetail !== null) {
                this.lastcomment_icon.push(s.user.avatarDetail.identityIconUrl);
              } else {
                this.lastcomment_icon.push(null);
              }
            });
            if (this.hotComments.length == 0) {
              //判断是否有精彩评论
              this.$refs.Great_reviews.style.display = "none";
            } else {
              this.$refs.Great_reviews.style.display = "block";
            }
          }
        });
    },
    //转换时间戳 专辑发行时间
    getLocalTime(nS) {
      let timeStr = nS.toString();
      let time_real = timeStr.substring(0, 10);
      this.time_albums.push(
        new Date(parseInt(time_real) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ")
      );
    },
    //转换时间戳 评论
    getLocalTime_comment(nS) {
      let timeStr = nS.toString();
      let time_real = timeStr.substring(0, 10);
      this.time_hot.push(
        new Date(parseInt(time_real) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ")
      );
    },
    getLocalTime1(nS1) {
      let timeStr1 = nS1.toString();
      let time_real1 = timeStr1.substring(0, 10);
      this.time_last.push(
        new Date(parseInt(time_real1) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ")
      );
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
    //用户头像点击跳转
    gouserCard(ids) {
      let obj = {
        path: "/userCard",
        query: {
          id: ids,
          type: 1,
        },
      };
      this.$router.push(obj);
    },
    //点击头部用户头像跳转 到 用户卡片
    goUsercardTop(ids) {
      let obj = {
        path: "/userCard",
        query: {
          id: ids,
          type: 2,
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
.Cover {
  padding: 30px 10px 30px 15px;
  position: relative;
  z-index: 999;
  color: #fff;
  overflow: hidden;
  .cover_bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    filter: blur(20px);
    -webkit-filter: blur(20px); /* chrome, opera */
    -ms-filter: blur(30px);
    -moz-filter: blur(30px);
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.5);
  }
  .main {
    .coverImgUrl {
      position: relative;
      z-index: 8;
      width: 36%;
      float: left;
      margin-right: 15px;
      border: 1px solid #eee;
    }
    .coverImgUrl_bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      height: 100%;
      padding-left: 100%;
      background: url("../../assets/album@2x.png") no-repeat;
      background-size: contain;
    }
    .top_icons {
      position: absolute;
      top: 10%;
      left: 0%;
      z-index: 9;
      padding: 0 8px;
      height: 17px;
      color: #fff;
      font-size: 9px;
      text-align: center;
      line-height: 17px;
      background-color: rgba(217, 48, 48, 0.8);
      border-top-right-radius: 17px;
      border-bottom-right-radius: 17px;
    }
    .gedanname {
      width: 58%;
      float: left;
      position: relative;
      z-index: 2;
      color: #fefefe;
      p {
        font-size: 12px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.albums_introduction {
  padding: 10px 10px 0 15px;
  height: 75px;
  background: #fff;
  p {
    height: 45px;
    background: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
.list_top {
  position: relative;
}
.real_list {
  list-style: none;
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
      border-bottom: 1px solid #eee;

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
.gedanlist {
  height: 23px;
  line-height: 23px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
  padding-left: 3%;
}
.Comments {
  position: relative;
  // margin-top: 11px;
  margin-bottom: 14%;
  .Great_reviews {
    height: 23px;
    margin: 0;
    padding: 4px 10px;
    background: #f2f2f2;
    h4 {
      font-size: 12px;
      font-weight: 300;
      color: #666;
    }
  }
  .Latest_comments {
    height: 23px;
    margin: 0;
    padding: 4px 10px;
    background: #f2f2f2;
    h4 {
      font-size: 12px;
      font-weight: 300;
      color: #666;
    }
  }
  .user_comments {
    display: flex;
    position: relative;
    padding: 10px 0 0 0;
    align-items: center;
    .user_img {
      flex: 1;
      padding-left: 3%;
      .user_img_icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        // background-color: #000;
        position: absolute;
        top: 60%;
        left: 76%;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #000;
      }
    }
    .comments_Real {
      flex: 9;
      border-bottom: 1px solid #eee;
      padding: 0 11px 10px 5px;
      .p4 {
        position: absolute;
        top: 3%;
        right: 3%;
      }
      .van-icon-good-job-o {
        margin-top: 1%;
      }
      span {
        font-size: 11px;
        color: #999;
      }
    }
  }
  .user_comments_last {
    display: flex;
    position: relative;
    padding: 10px 0 0 0;
    align-items: center;
    .user_img {
      flex: 1;
      padding-left: 3%;
      .user_img_icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        position: absolute;
        top: 60%;
        left: 76%;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #000;
      }
    }
    .comments_Real {
      flex: 9;
      border-bottom: 1px solid #eee;
      padding: 0 11px 10px 5px;
      .p4 {
        position: absolute;
        top: 11%;
        right: 3%;
      }
      .van-icon-good-job-o {
        margin-top: 1%;
      }
      span {
        font-size: 11px;
        color: #999;
      }
    }
  }
  .lookAll {
    height: 50px;
    padding: 18px 0;
    text-align: center;
    font-size: 14px;
    color: #999;
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