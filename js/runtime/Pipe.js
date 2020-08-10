import { Sprite } from "../base/Sprite";
import { DataStore } from "../base/DataStore";

// 水管的基类,是上下两种水管的父类
export class Pipe extends Sprite{
  constructor(img,top){
    // 获取屏幕
    const canvas = DataStore.getInstance().canvas;
    // 重写父类构造
    super(img,0,0,img.width,img.height,canvas.width,0,img.width,img.height);
    this.top = top;
  }
  draw(){
    this.x = this.x - 2;
    super.draw();
    
  }
}