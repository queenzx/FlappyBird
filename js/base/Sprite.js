// 精灵的基类(图片的基类),负责初始化图片加载的资源和大小以及位置

import { DataStore } from "./DataStore";

export class Sprite{
  constructor(img=null,srcX=0,srcY=0,srcW=0,srcH=0,x=0,y=0,width=0,height=0){
    // 通过变量池DataStore获取ctx
    this.ctx = DataStore.getInstance().ctx;
    this.img = img;//图片对象
    this.srcX = srcX;//画画的起始坐标,图片的坐标
    this.srcY = srcY;
    this.srcW = srcW;// 画画的宽度,图片的宽度
    this.srcH = srcH;
    this.x = x;// 图片在画布上的坐标
    this.y = y;
    this.width = width;// 图片在画布上的宽度
    this.height = height;
  }

  // 画画的方法
  draw(
    img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,y = this.y,
    width = this.width,
    height = this.height
  ){
    this.ctx.drawImage(img,srcX,srcY,srcW,srcH,x,y,width,height);
  }

  // 定义一个获取图片的方法
  static getImg(key){
    return DataStore.getInstance().res.get(key);
  }
}