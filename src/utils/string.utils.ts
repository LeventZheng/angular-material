/**
 * @FileName string.utils
 * @CreateTime 2018-05-12 14:20
 */
export class StringUtils {

  /**
   * 字符串是否包含某一个字符串
   * 例：
   * let a ="hello word";
   * let b = "hello";
   * console( contain(a,b) );
   * 结果:
   * true
   * @Title :
   * @author: xiaole
   * @desc :
   * @date:   2018/5/12
   * @return : obj
   */
  static contain(string,content){
    if(!string || !content) return false;

    return string.indexOf( content) >-1
  }

  static uuid(len: number, radix?: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }
}
