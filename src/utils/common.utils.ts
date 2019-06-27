const SparkMD5 = require('../../../assets/plugin/sparkmd5');
export class CommonUtils {
  /* 判断字符串是否不为空 */
  static isNotBlank(str) {
    return str !== null && str !== undefined && str !== '';
  }
  /* 判断字符串是否为空 */
  static isBlank(str) {
    return !CommonUtils.isNotBlank(str);
  }
  /* 获取字符串长度 */
  static getStringLength(str) {
    if (str) {
      let realLength = 0, len = str.length, charCode = -1;
      for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 0.5;
        else realLength += 1;
      }
      return realLength;
    } else {
      return 0
    }
  }
  /* 生成UUID */
  static generateUUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
  }
  /* 获取word内容的MD5值 */
  static getContentMD5(content){
    let md5 = new SparkMD5();
    md5.append(content);
    return md5.end();
  }

  /* 从当前url中获取参数 */
  static getQueryString(name: string | number): string {
    let url = location.href,
      theRequest = null,
      strs;
    if (url.indexOf('?') !== -1) {
      let str = url.substr(url.indexOf('?') + 1);
      strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        if (strs[i].split('=')[0] === name) {
          theRequest = strs[i].split('=')[1];
        }
      }
    }
    return theRequest;
  }
  /* 从传入的字符串中获取参数 */
  static getQueryFromString(url: string, name: string | number): string {
    let theRequest = null,
      strs;
    if (url.indexOf('?') !== -1) {
      let str = url.substr(url.indexOf('?') + 1);
      strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        if (strs[i].split('=')[0] === name) {
          theRequest = strs[i].split('=')[1];
        }
      }
    }
    return theRequest;
  }

  /*
  * @desc: 加强版四舍五入，支持保留n位小数
  * @params: {Number} num 被处理的数值 , {Number} precision 精确到小数点后几位
  * @return: {Number}
  * @author: zhoudonghui
  * @date: 2019/4/1
  */
  static round(num,precision){
    const k = Math.pow(10,precision);
    return Math.round(num*k)/k;
  }

  /*
  * @desc: 浮点数凑整处理方法。注：该方法建议做数值展示前的时候使用，勿用于计算过程中。
  * @params: {Number} float 被处理的浮点数 ,{Number} precision 精确到小数点后几位，默认12位
  * @return: {Number}
  * @test case: 0.553*100, 53.3/100, 40+3.08+90, ...
  * @author: zhoudonghui
  * @date: 2019/3/28
  */
  static strip(num, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
  }

  /* 深拷贝 */
  static clone(item: any): any {
    return JSON.parse(JSON.stringify(item));
  }
  /* 深拷贝 */
  static deepCopy(o) {
    if (o instanceof Array) {
      let n = [];
      for (let i = 0; i < o.length; ++i) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;

    } else if (o instanceof Object) {
      let n = {}
      for (let i in o) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
  }

  /*本地缓存时生成key值，用于区分不同用户*/
  static generateCacheKey(keyName: string) {
    if (!keyName) throw new SyntaxError('parameter keyName is required!');
    const user = JSON.parse(localStorage.getItem('user'));
    return keyName + user.id;
  }

  /* 合并对象，常用于使用后端数据后对本地数据进行更新 */
  static merge(target, source){
    if(target===undefined||target===null){
      return source;
    }
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], CommonUtils.merge(target[key], source[key]))
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
  }
  /**
   * 判断一个对象是否空对象
   * 前提是入参需要时{}格式的，如果传入true或false，会直接返回true
   * @param {any} o 必须是{}形式的
   */
  static isEmptyObject(o) {
    if (o===true || o===false) return o;
    for (let i in o) {
      if (o.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }
  /* 判断入参是否为空对象 */
  static isEmpty(o) {
    if (JSON.stringify(0) === '{}') return true;
    return false;
  }


  /**
   * 将知识点数组处理成字符串形式
   */
  static getKnowledge(knowledgeList: any[], syncKnowledgeList: any[]) {
    let str = '';
    let hasKnowledgeList = false;
    if (knowledgeList && knowledgeList.length > 0) {
      hasKnowledgeList = true;
      knowledgeList.forEach((knowledge, index) => {
        str += '<p>' + knowledge.name + '</p>';
      });
    }
    if (syncKnowledgeList && syncKnowledgeList.length > 0) {
      syncKnowledgeList.forEach((knowledge, index) => {
        str += '<p>' + knowledge.name + '</p>';
      });
    }
    return str;
  }

  /*
  * @desc: 递归循环
  * @params: root,fn
  * @author: zhoudonghui
  * @date: 2019/3/5
  */
  static iterate(root,fn) {
    root.forEach(node => {
      fn(node);
      if(node.children){
        CommonUtils.iterate(node.children,fn);
      }
    });
  }


  /**
   * 通用警告框
   * @static
   * @param {any} msg 弹框显示文字
   * @param {*} [type=false] false为错误,true为正确
   * @param {number} [_duration=1500] 弹框停留时长,0表示一直停留
   * @param {HTMLDivElement} [container] 弹框展示的元素位置，默认为顶级body
   * @memberof CommonUtils
   */
  static toast(msg, type: any = false, _duration = 1500, container?: HTMLElement) {
    // type true=成功 false=失败
    let _doc = window.top.document,
      _id = '_toast_div', _dialogs,
      _imgId = '_toast_img';
    _dialogs = _doc.getElementById(_id);
    if (_dialogs) {
      _dialogs.style.display = 'none';
      let _imgDom = _doc.getElementById(_imgId);
      if (type) {
        _imgDom['src'] = '../assets/icon/success.png';
      } else {
        _imgDom['src'] = '../assets/icon/notice_big.png';
      }
    } else {
      let _img = _doc.createElement('img');
      _img.id = _imgId;
      _img.className = 'mt_30';
      if (type) {
        _img.src = '../assets/icon/success.png';
      } else {
        _img.src = '../assets/icon/notice_big.png';
      }
      let _imgBlock = _doc.createElement('div');
      _imgBlock.className = 'ta_c';
      _imgBlock.appendChild(_img);
      let _progress = _doc.createElement('div');
      _progress.className = 'progress';
      _progress.appendChild(_imgBlock);
      let _text = _doc.createElement('div');
      _text.className = 'text';
      _text.id = 'dialogText';
      let _dialog = _doc.createElement('div');
      _dialog.className = 'dialog show-sweet-slert';
      _dialog.appendChild(_progress);
      _dialog.appendChild(_text);
      _dialogs = _doc.createElement('div');
      _dialogs.id = _id;
      _dialogs.className = 'dialogs';
      _dialogs.appendChild(_dialog);
    }
    (container || _doc.body).appendChild(_dialogs);
    document.getElementById('dialogText').innerText = msg;
    // _dialogs.style.transition = 'opacity' + _duration + 'ms linear;';
    // _dialogs.style.opacity = _opacity;
    _dialogs.style.display = 'block';
    if (_duration > 0) {
      setTimeout(() => {
        _dialogs.style.display = 'none';
      }, _duration);
    }
  }
  /* 隐藏弹框 */
  static hideToast() {
    let _doc = window.top.document,
      _id = '_toast_div', _dialogs;
    _dialogs = _doc.getElementById(_id);
    if (_dialogs) {
      _dialogs.style.display = 'none';
    }
  }

  static isJSON(str) {
    if (typeof str == 'string') {
      try {
        let obj=JSON.parse(str);
        return (typeof obj == 'object' && obj )
      } catch(e) {
        return false;
      }
    }else {
      return false
    }
  }

  /* 节流 */
  static throttle(callback: (event: Event, ...restOfArgs: any[]) => any, interval: number) {
    let timeout = null, lock = false;
    return function() {
      let context = this, args = arguments;
      if (!lock) {
        callback.apply(context, args);
        lock = true;
        timeout = setTimeout(() => {
          lock = false;
        }, interval);
      }
    };
  }

  /* 防抖动 */
  static debounce(callback:any, delay:Number) {
    let timeout;
    return function () {
      let context = this, args = arguments;
      let later = function () {
        timeout = null;
        callback.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  }
  // 判断页面是否处于全屏状态，如果有返回的是处于全屏状态的div元素，经过转换成boolean类型判断
  static _fullscreenElement() {
    return !!window.document.fullscreenElement || !!window.document.webkitFullscreenElement || false;
  }
  // 退出全屏
  static _exitFullscreen() {
    if (document.exitFullscreen) {
      window.document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (window.document as any).mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      window.document.webkitExitFullscreen();
    }
  }
  //阿拉伯数字转换为简写汉字
  static arabSimplified(Num) {
    for (let i = Num.length - 1; i >= 0; i--) {
      Num = Num.replace(",", "")//替换Num中的“,”
      Num = Num.replace(" ", "")//替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
      //alert("请检查小写金额是否正确");
      return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    const part = String(Num).split(".");
    let newchar = "";
    //小数点前进行转化
    for (var i = part[0].length - 1; i >= 0; i--) {
      if (part[0].length > 10) {
        //alert("位数过大，无法计算");
        return "";
      }//若数量超过拾亿单位，提示
      let tmpnewchar = "";
      const perchar = +part[0].charAt(i);
      switch (perchar) {
        case 0:  tmpnewchar = "零" + tmpnewchar;break;
        case 1: tmpnewchar = "一" + tmpnewchar; break;
        case 2: tmpnewchar = "二" + tmpnewchar; break;
        case 3: tmpnewchar = "三" + tmpnewchar; break;
        case 4: tmpnewchar = "四" + tmpnewchar; break;
        case 5: tmpnewchar = "五" + tmpnewchar; break;
        case 6: tmpnewchar = "六" + tmpnewchar; break;
        case 7: tmpnewchar = "七" + tmpnewchar; break;
        case 8: tmpnewchar = "八" + tmpnewchar; break;
        case 9: tmpnewchar = "九" + tmpnewchar; break;
      }
      switch (part[0].length - i - 1) {
        case 0: tmpnewchar = tmpnewchar; break;
        case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
        case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
        case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
        case 4: tmpnewchar = tmpnewchar + "万"; break;
        case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
        case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
        case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
        case 8: tmpnewchar = tmpnewchar + "亿"; break;
        case 9: tmpnewchar = tmpnewchar + "十"; break;
      }
      newchar = tmpnewchar + newchar
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
      newchar = newchar.replace("零亿", "亿");
      newchar = newchar.replace("亿万", "亿");
      newchar = newchar.replace("零万", "万");
      newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
      newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
      newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
  }

  /*
  * @desc: 调换数组中item的位置
  * @params: array,fromIndex,toIndex
  * @author: zhoudonghui
  * @date: 2018/12/29
  */
  static moveItemInArray(array, fromIndex, toIndex){
    const clamp = (value, max) => {
      return Math.max(0, Math.min(max, value));
    };
    let from = clamp(fromIndex, array.length - 1);
    let to = clamp(toIndex, array.length - 1);
    if (from === to) {
      return;
    }
    let target = array[from];
    let delta = to < from ? -1 : 1;
    for (let i = from; i !== to; i += delta) {
      array[i] = array[i + delta];
    }
    array[to] = target;
  }
  /*
  * @desc: 移除数组某个元素
  * @params: {Array} array,{Any} itemToRemove
  * @return: {Array} result
  * @author: zhoudonghui
  * @date: 2019/1/25
  */
  static removeArrayItem(array,itemToRemove){
    const index = array.indexOf(itemToRemove);
    array.splice(index, 1);
  }

  /* 集合的基本操作 */

  /*
  * @desc: 判断两个集合是否存在父子集关系
  * @params: {Set} set, {Set} subset
  * @return: {Boolean}
  * @author: zhoudonghui
  * @date: 2019/1/25
  */
  static isSuperset(set, subset) {
    for (var elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  /*
  * @desc: 取并集
  * @params: {Set} setA, {Set} setB
  * @return: {Set}
  * @author: zhoudonghui
  * @date: 2019/1/25
  */
  static union(setA, setB) {
    var _union = new Set(setA);
    for (var elem of setB) {
      _union.add(elem);
    }
    return _union;
  }

  /*
  * @desc: 取交集
  * @params: {Set} setA, {Set} setB
  * @return: {Set}
  * @author: zhoudonghui
  * @date: 2019/1/25
  */
  static intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }

  /*
    * @desc: 取集合A相对于集合B的差集
    * @params: {Set} setA, {Set} setB
    * @return: {Set}
    * @author: zhoudonghui
    * @date: 2019/1/25
    */
  static difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }
}
