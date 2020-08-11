// 小游戏主程序,初始化小游戏过程中的数据
import { ResourceLoader } from "./js/base/ResourceLoader";
import { DataStore } from "./js/base/DataStore";
import { Background } from "./js/runtime/Background";
import { Director } from "./js/Director";
import { Land } from "./js/runtime/Land";
import { Birds } from "./js/player/Birds";
import { StartButton } from "./js/player/StartButton";
import { Score } from "./js/player/Score";
import { Extra } from "./js/Extra";

export class Main{
  constructor(){ // 构造方法,在创建对象时会自动执行
    console.log('游戏开始');
    // 获取资源加载器
    this.loader = new ResourceLoader();
    // 获取变量池
    this.store = DataStore.getInstance();
    // 获取导演
    this.director = Director.getInstance()
    // 获取canvas
    this.canvas = wx.createCanvas();
    // 获取Extra对象
    this.ex = new Extra();
    // 获取ctx
    this.ctx = this.canvas.getContext('2d');
    /* // 画一张图,测试使用
    let bg = this.loader.map.get("background");
    // 调用loader里的onloaded方法
    this.loader.onloaded(()=>{
      this.ctx.drawImage(bg,0,0,bg.width,bg.height);
    }); */
    // 当图片加载完成时执行后续代码
    this.loader.onloaded(map=>this.onResourceLoaded(map));
    // 箭头函数的普通形式
    /* this.loader.onloaded(function(map){
      this.onResourceLoaded(map)
    }); */
  }
  // 当图片资源加载完成之后执行
  onResourceLoaded(map){
    // 将游戏中的数据保存进变量池中
    this.store.canvas = this.canvas;
    this.store.ctx = this.ctx;
    this.store.res = map;//map保存的图片对象
  
    // console.log(this.store);
    // 测试
    /* let bg = new Background();
    bg.draw(); */
    // 调用微信中的一些API方法
    // this.ex.bgm();
    /* this.ex.getUser((err,res)=>{
      if(err){//表示没有授权
        this.ex.userBotton();//授权按钮
      }else{//有授权信息

      }
    }); */
    // this.ex.getUser();// 已授权,可以直接获取
    // this.ex.userBotton();//未授权需要这样获取

    // this.ex.getTelInfo();
    // this.ex.download();
    // this.ex.upload();
    // this.ex.send();
    this.init();
  }
  // 初始化游戏
  init(){
    this.director.isGameOver = false;
    // 将游戏中的数据通过put保存进变量池
    // 游戏中的数据在游戏结束后会全部销毁
    // 而通过属性保存的数据不会销毁
    // console.log(typeof Background);
    this.store
    .put('background',Background)
    .put('land',Land)
    .put('pipes',[])
    .put('birds',Birds)
    .put('startButton',StartButton)
    .put('score',Score);
    // console.log(this.store);
    // 执行run方法之前先调用一次创建水管的方法
    this.director.createPipes();
    this.director.run();
    this.registerEvent();
  }
  registerEvent(){
    wx.onTouchStart(res => {
      let { clientX, clientY} = res.touches[0];
			if(clientX<100&&clientY<45){
        // this.ex.upload();
        this.ex.socket();
				return ;
			}
      // console.log(res);
      // 当游戏结束时,点击重新开始
      // 游戏没有结束时,触发小鸟向上飞的事件
      if(this.director.isGameOver){
        // 游戏结束,点击重新开始
        this.init();
      }else{
        // 游戏没有结束，点击向上飞
        this.director.birdsEvent();
      }
    });
  }
}