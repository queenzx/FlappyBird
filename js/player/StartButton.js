// 游戏结束时,显示在屏幕中央的图标

import { Sprite } from "../base/Sprite";
import { DataStore } from "../base/DataStore";

export class StartButton extends Sprite{
  constructor(){
    const img = Sprite.getImg('startButton');
    const canvas = DataStore.getInstance().canvas;
    const land = Sprite.getImg('land');
    const x = (canvas.width-img.width)/2;
    const y = (canvas.height-land.height - img.height)/2;
    // 重新父类构造
    super(img,0,0,img.width,img.height,x,y,img.width,img.height);
  }
}