// 得分类
import { DataStore } from "../base/DataStore";

// 分数没有图片,所以不需要继承Sprite
export class Score{
  constructor(){
    this.store = DataStore.getInstance();
    this.ctx = this.store.ctx;
    this.scoreNumber = 0;
    // 限制加分
    this.canAdd = true;  
  }
  draw(){
    this.ctx.font = '25px Arial';
    this.ctx.fillStyle = '#de335e';
    this.ctx.fillText(this.scoreNumber,
      this.store.canvas.width/2,
      this.store.canvas.height/18);//(分数,x,y)
  }
}
