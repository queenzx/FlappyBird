// 变量池,用于保存游戏过程中的数据,方便在不同的类中访问或修改数据
export class DataStore{
  constructor(){
    this.map = new Map();
  }
  // 使用单例模式(有且仅有一个实例对象)
  // 保证所有人获取的都是同一个变量池中的数据
  // static表示该方法不是一个实例方法,而是一个静态方法,由类(DataStore)直接调用,而不是实例对象调用
  static getInstance(){
    // 先判断DataStore有没有instance熟悉
    // 如果有,则直接返回该属性
    // 如果没有,则创建一个绑定到instance上,然后返回
    if(!DataStore.instance){
      // 没有实例对象,创建一个绑定到属性instance上
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;                     
  }
  // 保存数据
  put(key,val){
    if(typeof val == 'function'){
      val = new val();
    }
    this.map.set(key,val);
    // 返回原对象,方便链式调用
    return this;
  }

  // 获取数据
  get(key){
    return this.map.get(key);
  }

  // 销毁所有游戏数据
  destroy(){
    for(let val of this.map.values()){
      val = null;
    }
  }
}