import { Sprite } from "../base/Sprite";
import { DataStore } from "../base/DataStore";

// 背景类
// Background继承Sprite类,就可以直接使用Sprite中的属性和普通方法
export class Background extends Sprite{
  constructor(){
    // 获取背景图
    const img = Sprite.getImg('background');
    // 获取屏幕的宽高
    const store = DataStore.getInstance();
    const width = store.canvas.width;
    const height = store.canvas.height;

    // 子类继承父类，子类必须要在构造中调用super方法(实际上就是调用父类构造)
    // 在调用super方法之前,不可使用this关键字
    // super方法用来重写父类构造的
    super(img,0,0,img.width,img.height,0,0,width,height);
    
  }
}