import { DataStore } from "./base/DataStore";

// 额外的一些功能
export class Extra{
  constructor(){

  }
  // 背景音乐
  bgm(){
    const ctx = wx.createInnerAudioContext();
    ctx.autoplay = true;
    ctx.src = './audio/bgm.mp3';
    ctx.onPlay(() => {
      console.log('开始播放');
    });
    ctx.onError((res) => {
      console.log(res);
    });
  }

  // 爆炸音乐
  boom(){
    const ctx = wx.createInnerAudioContext();
    ctx.autoplay = true;
    ctx.src = './audio/boom.mp3';
  }
  // 穿过水管音乐
  through(){
    const ctx = wx.createInnerAudioContext();
    ctx.autoplay = true;
    ctx.src = './audio/bullet.mp3';
  }
  // 获取用户信息按钮(授权方法)
  userBotton(){
    let button = wx.createUserInfoButton({
      type: 'text',
      text: '获取用户信息',
      style: {
        left: DataStore.getInstance().canvas.width/2-100,
        top: 76,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    }) 
    button.onTap((res) => {
      console.log(res);
      if(res.userInfo){
        // 授权
        button.destroy();
      }else{
        // 没授权
      }
    })
  }
  
  // 获取用户信息(微信信息)
  getUser(callback){
    //该方法需要先授权才能使用
    wx.getUserInfo({
      // success:function(res){
      success:(res)=>{//防止this指向问题
        // console.log(res);
        callback(null,res);
      },fail(err){
        // console.log(err);
        callback(err,null);
      }
    });
  }
  // 获取手机系统信息
  getTelInfo(){
    wx.getSystemInfo({
      success:result=>{
        console.log(result);
      }
    })
  }

  // 下载文件
  download(){
    wx.downloadFile({
      url: 'http://audio04.dmhmusic.com/71_53_T10054104717_128_4_1_0_sdk-cpm/cn/0103/M00/EE/3B/ChR45F6NhqqAThd4ACkdDzahS38951.mp3?xcode=3dd86c7136ff99f96ca71299e16b8c31451fef1',
      success:res=>{
        /* // 直接播放
        let ctx = wx.createInnerAudioContext();
        ctx.autoplay = true;
        ctx.loop = true;
        ctx.play(); */
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:res=>{
            console.log(res);
          }
        })
      },
      fail:err=>{
        console.log(err);
      }
    })
  }

  // 上传文件
  upload(){
    wx.chooseImage({
      success(res){
        wx.uploadFile({
          url: 'http://localhost:4000/upload',
          filePath: res.tempFilePaths[0],
          name: 'music',
          success(res){
            console.log(res);
          },
          fail(err){
            console.log(err);
          }
        })
      }
    })
  }
  
  // 发送http请求
  send(){
    wx.request({
      url: 'http://www.baidu.com',
      success(res){
        console.log(res);
      }
    })
  }

  // socket连接
  socket(){
    // 连接socket服务器
    wx.connectSocket({
      url: 'wss://localhost:4000',
      success(res){
        console.log('连接成功');
      },
      fail(err){
        console.log(err);
        console.log('连接失败');
      }
    });
    // 连接成功后
    wx.onSocketOpen(function(){
      wx.sendSocketMessage({
        data:'微信小游戏发送的数据',
        success(res){
          console.log('成功');
        },
        fail(err){
          console.log('失败');
        }
      })
    })
  }
}

