export class DomUtils {
  $: any;

  /* 显示/隐藏根组件顶部导航 */
  static toggleNavFooter(isShow = false) {
    if (isShow) {
      (document.querySelector('.app #navHeader') as HTMLElement).style.display = 'block';
      (document.querySelector('#rootFooter') as HTMLElement).style.display = 'block';
      (document.querySelector('.app .main') as HTMLElement).style.marginTop = '60px';
      DomUtils.changeBodyOverFlow('auto');
    } else {
      (document.querySelector('.app #navHeader') as HTMLElement).style.display = 'none';
      (document.querySelector('#rootFooter') as HTMLElement).style.display = 'none';
      (document.querySelector('.app .main') as HTMLElement).style.marginTop = '0px';
    }
  }
  /* 显示/隐藏根组件顶部导航 */
  static toggleNav(isShow = false) {
    if (isShow) {
      (document.querySelector('.app #navHeader') as HTMLElement).style.display = 'block';
      (document.querySelector('.app .main') as HTMLElement).style.marginTop = '60px';
      DomUtils.changeBodyOverFlow('auto');
    } else {
      (document.querySelector('.app #navHeader') as HTMLElement).style.display = 'none';
      (document.querySelector('.app .main') as HTMLElement).style.marginTop = '0px';
    }
  }
  /* 切换成沉浸式背景 */
  static toggleImmersiveBackground(isImmersive = false) {
    if (isImmersive) {
      document.body.style.background = 'url(../assets/img/one-to-one/desktop-banner.png) no-repeat';
      document.body.style.backgroundColor = '#F9F9F9';
      document.body.style.backgroundSize = 'contain';
    } else {
      document.body.style.background = '';
      document.body.style.backgroundColor = '';
      document.body.style.backgroundSize = '';
    }
  }
  /* 回到顶部 */
  static returnTop() {
    $('body, html').animate({ scrollTop: 0 }, 50);
  }
  /* 让滚动条滚到某个位置 */
  static scrollTo(pos: number, animate?: boolean) {
    if (animate) {
      $('body, html').animate({ scrollTop: pos }, 50);
    } else {
      window.scrollTo(0, pos);
    }
  }
  /* 文件下载 */
  static dowmloadFile(downFileUrl: string) {
    const a = document.createElement('a');
    a.href = downFileUrl;
    a.setAttribute('download', '');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.addEventListener('click', () => {
      $(a).remove();
    });
    a.click();
  }
  static changeBodyOverFlow(prop: 'hidden' | 'auto') {
    document.body.style.overflowY = prop;
    if (prop === 'hidden') {
      document.body.style.paddingRight = 'calc(100vw - 100%)';
    } else {
      document.body.style.paddingRight = '0px';
    }
  }
  static addOverflowScroll() {
    $(document.body).addClass('overflow_scroll');
  }
  static removeOverflowScroll() {
    $(document.body).removeClass('overflow_scroll');
  }

  static gt1440() {
    return this._clientWidth() > 1440;
  }

  static lt1440() {
    return this._clientWidth() < 1440;
  }

  static lte1440() {
    return this._clientWidth() <= 1440;
  }

  static lt1366() {
    return this._clientWidth() < 1366;
  }

  static lte1366() {
    return this._clientWidth() <= 1366;
  }

  static _clientWidth() {
    return document.body.clientWidth;
  }

  /**
   * 禁止div滚动的时候body跟着一起滚动
   * @Title :
   * @author: xiaole
   * @desc :
   * @date:   2018/3/8
   * @return : obj
   */
  static cancelScroll(even, source) {
    if (even.target != source) {
      return;
    }
    even = even || window.event;
    if (even.stopPropagation) {
      // 这是取消冒泡
      even.stopPropagation();
    } else {
      even.cancelBubble = true;
    }

    if (even.preventDefault) {
      // 这是取消默认行为，要弄清楚取消默认行为和冒泡不是一回事
      even.preventDefault();
    } else {
      even.returnValue = false;
    }
  }

  /**
   * 控制是否显示 展开 更多 这种按钮
   * @Title :
   * @author: xiaole
   * @desc :
   * @date:   2018/5/8
   * @return : obj
   */
  static isShowOpenBtn(parentNode, allowHeight) {
    if (!parentNode || !allowHeight) {
      return false;
    }
    try {
      const firstTop = parentNode.firstElementChild.getBoundingClientRect().top;
      const lastTop = parentNode.lastElementChild.getBoundingClientRect().top;
      return lastTop - firstTop > 0;
    } catch (e) {
      return false;
    }
  }

  /**
   * 判断时间的path里面是否存在 特定属性的的node
   * @Title :
   * @author: xiaole
   * @desc :
   * @date:   2018/5/17
   * @return : obj
   */
  static noExistAttr(event, attrValue) {
    let result = true;
    event.path.forEach(node => {
      if (node.nodeType == 1 && node.getAttribute('data-hidePanel') == attrValue) {
        result = false;
        return;
      }
    });
    return result;
  }

  /**
   * 元素class中是否存在某个class
   * @Title :
   * @author: xiaole
   * @desc :
   * @date:   2018/5/25
   * @return : obj
   */
  static hasClassName(ele, className) {
    if (!ele || !className) {
      return false;
    }
    return (ele.className || '').indexOf(className) > -1;
  }
}
