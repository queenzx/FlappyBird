// 小鸟类

import { Sprite } from "../base/Sprite";
import { DataStore } from "../base/DataStore";

export class Birds extends Sprite{
  constructor(){
    // 获取小鸟的图片
    const img = Sprite.getImg("birds");
    super(img,0,0,img.width,img.height,0,0,img.width,img.height);
    // 裁剪小鸟
    // 小鸟的宽是34，高是24，上下边距是10，左右边距是9
    this.clippingX = [9,9+34+18,9+34+18+34+18];// 裁剪的x坐标
    this.clippingY = [10,10,10];// 裁剪的y坐标
    this.clippingWidth = [34,34,34];// 裁剪的宽度
    this.clippingHeight = [24,24,24];// 裁剪的高度
    const canvas = DataStore.getInstance().canvas;
    const birdsX = canvas.width/4; 
    this.birdsX = [birdsX,birdsX,birdsX];// 小鸟的初始x坐标
    const land = Sprite.getImg('land');
    const birdsY = (canvas.height - land.height)/2;
    this.birdsY = [birdsY,birdsY,birdsY];//小鸟的初始y坐标
    this.birdsWidth = [34,34,34]; // 每个小鸟的宽度
    this.birdsHeight = [24,24,24]; // 每个小鸟的高度
    this.y = [birdsY,birdsY,birdsY]; // 小鸟的实时y坐标
    this.index = 0; // 下标,切换小鸟，实现动态的效果
    this.count = 0; // 计数器
    this.time = 0; // 计时器，自由落体的时间
  }
  draw(){
    // 下标的切换,实现小鸟的动态效果
    this.count++;
    // this.count +=2 ;
    if(this.count >= 30){
      this.count = 0;
    }
    this.index = Math.floor(this.count/10);
    // 小鸟的自由落体运动
    const g = 0.98/2;// 模拟重力加速度
    const offSetUp = 30;// 向上的偏移量
    const offSetY = (g*this.time*(this.time-offSetUp))/2;
    for(let i=0;i<=2;i++){ 
      this.birdsY[i] = this.y[i]+offSetY;
    }
    this.time++;
    // 重写父类draw方法
    super.draw(this.img,
      this.clippingX[this.index],
      this.clippingY[this.index],
      this.clippingWidth[this.index],
      this.clippingHeight[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index]);
  }
}