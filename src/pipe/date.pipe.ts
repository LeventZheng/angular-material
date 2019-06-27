
import { Pipe, PipeTransform,NgModule } from '@angular/core';

/**
 * 根据type展示日期，如yy年MM月dd日，yyyy-MM-dd
 * @export
 * @class DatePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'dateFormat'
})

export class DatePipe implements PipeTransform {
  transform(dateTime: Date, type: string ): any {
    if(dateTime){
      let date = new Date(dateTime);
      let o = {
        "M+": date.getMonth() + 1,                    //月份
        "d+": date.getDate(),                         //日
        "h+": date.getHours(),                        //小时
        "m+": date.getMinutes(),                      //分
        "s+": date.getSeconds(),                      //秒
        "q+": Math.floor((date.getMonth() + 3) / 3),  //季度
        "S": date.getMilliseconds()                   //毫秒
      };
      if (/(y+)/.test(type))
        type = type.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(type))
          type = type.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return type.startsWith('hh')?type:type.replace(/^[0]+/,"");
    }else {
      return '';
    }
  }
}

/**
 * wengxijun
 * 日期展示
 * 说明：将入参(timestamp)与显示的时间进行对比
 * 1.差值为负数或0显示‘刚刚’
 * 2.差值为1分钟以内显示'x秒前'
 * 3.差值为1分钟以上1小时以内显示'x分钟前'
 * 4.差值为24小时以内并且没有跨天显示'今天 hh:mi'
 * 5.超过一天显示'mm-dd hh:mi'
 * 6.超过一年或跨年显示'yyyy-mm-dd hh:mi'
 */
@Pipe({
  name: 'unixFormat'
})
export class UnixFormatPipe implements PipeTransform {
  transform(timestamp: number): any {
    let nowDate = new Date();
    let offsetstamp = Number.parseInt(localStorage.getItem('sertimestamp'));
    let thisYear = nowDate.getFullYear();
    let stampDate = new Date(timestamp * 1000);
    let stampYear = stampDate.getFullYear();
    let m = stampDate.getMonth() + 1;
    let d = stampDate.getDate();
    let h = stampDate.getHours();
    let mi = stampDate.getMinutes();
    if (thisYear === stampYear) {
      let timerange = offsetstamp + nowDate.getTime() - timestamp * 1000;
      if (timerange < 60000) {
        if (Math.floor((timerange) / 1000) <= 0) {
          return '刚刚';
        }else {
          return Math.floor((timerange) / 1000) + '秒前';
        }
      }else if (timerange >= 60000 && timerange < 3600000) {
        return Math.floor(timerange / 60000) + '分钟前';
      }else if (timerange >= 3600000 && timerange < 86400000 && nowDate.getDate() === d) {
        return '今天' + (h < 10 ? '0' + h : '' + h) + ':' + (mi < 10 ? '0' + mi : '' + mi);
      }else if (nowDate.getDate() !== d) {
        return m + '-' + d + ' ' + (h < 10 ? '0' + h : '' + h) + ':' + (mi < 10 ? '0' + mi : '' + mi);
      }
    } else {
      return stampDate.getFullYear() + '-' + m + '-' + d + ' ' + (h < 10 ? '0' + h : '' + h) + ':' + (mi < 10 ? '0' + mi : '' + mi);
    }

  }
}

@NgModule({
  imports: [],
  exports: [DatePipe,UnixFormatPipe],
  declarations: [UnixFormatPipe,DatePipe],
  providers: [],
})
export class DatePipeModule { }



