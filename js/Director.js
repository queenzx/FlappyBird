// 导演类,控制游戏的流程
import { DataStore } from "./base/DataStore";
import { UpPipe } from "./runtime/UpPipe";
import { DownPipe } from "./runtime/DownPipe";
import { Extra } from "./Extra";

export class Director{
  constructor(){
    // 获取唯一的一个变量池
    this.store = DataStore.getInstance();
    this.isGameOver = false;
  }

  // 导演类也必须保证唯一
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }

  // 定义创建水管的方法
  createPipes(){
    // 获取top
    const minTop = this.store.canvas.height/8;
    const maxTop = this.store.canvas.height/2;
    const top = Math.random()*(maxTop - minTop) + minTop;
    // 创建上下一组水管
    const up = new UpPipe(top);
    const down = new DownPipe(top);
    // 将一组水管放进变量池中
    this.store.get('pipes').push(up);
    this.store.get('pipes').push(down);
  }

  // 定义小鸟事件
  birdsEvent(){
    for(let i=0;i<3;i++){
      this.store.get('birds').y[i] = this.store.get('birds').birdsY[i];
    }
    // 重置自由落体的时间为0
    this.store.get('birds').time = 0;
  }

  // 判断小鸟与某一个水管是否相撞
  isStrike(bird,pipe){
    let strike = true; // 假设撞上了
    // 没撞上的情况
    if(bird.left > pipe.right || 
      bird.bottom < pipe.top ||
      bird.right < pipe.left ||
      bird.top > pipe.bottom){
        strike = false;
    }
    return strike;
  }

  // 判断游戏是否结束
  check(){
    // 游戏结束的条件:撞到顶部或者底部或者水管
    let land = this.store.get('land');
    let birds = this.store.get('birds');
    let pipes = this.store.get('pipes');
    let score = this.store.get('score');
    let canvas = this.store.canvas;
    if(birds.birdsY[0] < 0 || birds.birdsY[0] >(canvas.height - land.height-birds.birdsHeight[0])){
      this.isGameOver = true;
      return ;
    }
    // 判断与水管是否相撞
    const birdBorder = {
      top:birds.birdsY[0],
      right:birds.birdsX[0] + birds.birdsWidth[0],
      bottom:birds.birdsY[0] + birds.birdsHeight[0],
      left:birds.birdsX[0]
    };
    for(let i=0;i<pipes.length;i++){
      const p = pipes[i];
      const pipeBorder = {
        top: p.y,
        right: p.x + p.width,
        bottom: p.y + p.height,
        left: p.x
      };
      // 判断小鸟与每一个水管是否相撞
      if(this.isStrike(birdBorder,pipeBorder)){
        this.isGameOver = true;
      }
    }
    // 判断得分(canAdd为true且小鸟的左边大于水管的右边)
    if(score.canAdd && birds.birdsX[0]>pipes[0].x + pipes[0].width){
      new Extra().through();
      score.scoreNumber++;
      score.canAdd = false;
    }
  }
  // 运行方法
  run(){
    // 先检查 游戏有没有结束
    this.check();
    // console.log(this.store);
    if(!this.isGameOver){ // 游戏没结束
      // 从变量池中取出相应的图片并绘制
      this.store.get('background').draw();
      // this.createPipes();
      // 判断是否应该生成新的一组水管
      let pipes = this.store.get('pipes');
      // 当第一组水管超过界面外时,删除
      if(pipes[0].x + pipes[0].width<=0 && pipes.length == 4){
        // 删除上下两个水管
        pipes.shift();
        pipes.shift();
        // 打开计分器
        this.store.get('score').canAdd = true;
      }
      // 当水管数组长度小于等于2,且上一组水管到达中间的时候,生成下一组水管
      if(pipes.length<=2 && (pipes[0].x+pipes[0].width)<this.store.canvas.width/2){
        this.createPipes();
      }
      pipes.forEach(val=>{
        val.draw();
      })
      this.store.get('birds').draw();
      this.store.get('land').draw();
      this.store.get('score').draw();
      // 上传文件区域
      this.store.ctx.fillStyle = '#A4FFFF';
      this.store.ctx.fillRect(0,0,100,45);
      // 通过不停的执行回调函数,实现渲染的效果
      // setInterval是设置固定毫秒值来运行
      // requestAnimationFrame是根据浏览器的刷新帧率来运行,效率比setInterval好
      this.timer = requestAnimationFrame(() => this.run());
    }else{ // 游戏结束
      new Extra().boom();
      // 解决手机端黑屏
      this.store.get('background').draw();
      this.store.get('pipes').forEach(val=>{
        val.draw();
      });
      this.store.get('birds').draw();
      this.store.get('land').draw();
      this.store.get('score').draw();
      this.store.ctx.fillStyle = '#A4FFFF';
      this.store.ctx.fillRect(0,0,100,45);
      // 关掉计时器
      cancelAnimationFrame(this.timer);
      // 画图表 
      this.store.get('startButton').draw();
      // 清空游戏数据
      this.store.destroy(); 
    }
  }
}