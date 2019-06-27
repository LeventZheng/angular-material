/**
 * 日期处理工具
 * 
 * @export
 * @class DateUtils
 */
export class DateUtils {
  /**
   * 将日期处理成规定的格式
   * @static
   * @param {Date} date 日期
   * @param {string} pattern 样式，如:yyyy-MM-dd hh:mm:ss,或者yyyy-MM-dd
   * @returns 2017-12-29 11:05:37
   * @memberof DateUtils
   */
  static format(date: Date, pattern: string) {
    let o: any = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(pattern)) {
        pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return pattern;
  }
  /**
   * 解析日期字符串返回Date
   * @param text 日期字符串，如2018-01-06 09:20:20
   */
  static parse(text: string): any {
    try {
      return JSON.parse(text,
        (key, value) => {
          if (typeof value === 'string') {
            let match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(value);
            if (match) {
              return new Date(Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4] - 8, +match[5], +match[6]));
            }
          }

          return value;
        }
      );
    }
    catch (e) {
      return null;
    }
  }
  /**
   * 将日期Date转成yyyy-MM-dd hh:mm:ss形式的字符串
   * @param value
   * @param replacer
   * @param space
   */
  static stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
    Date.prototype.toJSON = function () {
      return DateUtils.format(this, 'yyyy-MM-dd hh:mm:ss');
    };

    try {
      return JSON.stringify(value, replacer, space);
    }
    catch (e) {
      return '';
    }
  }
}
