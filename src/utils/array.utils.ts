/**
 * 处理数组的通用方法
 */
export class ArrayUtils {
    /**
     * 升序排序
     * 用法示例：dataList.sort(ArrayUtils.compareUp(dataList, 'propertyName'))
     * @param data
     * @param propertyName
     */
    static compareUp(data: any[], propertyName?: string) {
        if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
            return function(object1, object2) {
                let value1 = object1[propertyName];
                let value2 = object2[propertyName];
                return value1.localeCompare(value2);
            }
        }
        else {
            return function(object1, object2) { // 属性值为数字
                let value1 = object1[propertyName];
                let value2 = object2[propertyName];
                return value1 - value2;
            }
        }
    }
    /**
     * 降序排序
     * 用法示例：dataList.sort(ArrayUtils.compareDown(dataList, 'propertyName'))
     * @param data
     * @param propertyName
     */
    static compareDown(data: any[], propertyName?: string) {
        if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
            return function(object1, object2) {
                let value1 = object1[propertyName];
                let value2 = object2[propertyName];
                return value2.localeCompare(value1);
            }
        }
        else {
            return function(object1, object2) { // 属性值为数字
                let value1 = object1[propertyName];
                let value2 = object2[propertyName];
                return value2 - value1;
            }
        }
    }

    /**
     * 删除对象数组中特定的元素
     * 例：
     * let array =  [{id:1,"学段"},{id:2,"学科"}]
     * remove(array,1,'id');
     * 结果为:
     * [{id:2,"学科"}]
     * @Title :
     * @removeObj  false 返回删除元素后的数组  true 返回删除后的元素
     * @author: xiaole
     * @desc :
     * @date:   2018/5/10
     * @return : obj
     */
    static remove(array,key,arrayKey:string='id'){
      if(!array) return null;
      let index =  array.findIndex( v =>{return v[arrayKey] == key});
      if(index == -1){
        return null;
      }else{
        let removeItem =  array.splice(index,1);
        return removeItem[0]
      }
    }

  /**
   *
   * @author: xiaole
   * @date: 2018/6/22
   * @time: 下午10:17
   * @desc:
   */
    static finIndex(array,key,arrayKey:string='id'):number{
      if(!array) return -1;
      let index =  array.findIndex( v =>{return v[arrayKey] == key});
      return index;
    }

  /**
   *
   * @author: xiaole
   * @date: 2018/6/22
   * @time: 下午10:18
   * @desc:
   */
    static isExist(array,key,arrayKey:string='id'){
      return this.finIndex(array,key,arrayKey) != -1;
    }
}
