import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';

/**
 * 顶部走马灯
 * @export
 * @class TopCarouselComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'top-carousel',
  templateUrl: './top-carousel.component.html',
  styleUrls: ['./top-carousel.component.css']
})
export class TopCarouselComponent implements OnInit, OnDestroy {

  imgBannerList: ImgVO[] = []; // 轮播图片列表
  curImg: number = 0;
  interval: any;
    constructor() { }
    ngOnInit() {
      this.imgBannerList = [
        { id: '1', url: '/assets/img/prepare-lessons/banner01.jpg', bgcolor: 'transparent', isAct: true},
        { id: '2', url: '/assets/img/prepare-lessons/banner02.jpg', bgcolor: 'transparent', isAct: false}
      ];
      this.interval = setInterval(() => {
        let num = this.curImg;
        if(this.curImg < this.imgBannerList.length) {
          num++;
          this.curImg < this.imgBannerList.length-1 && (this.curImg++);
        }
        if (num == this.imgBannerList.length) {
          this.curImg = 0;
        }
        this.setCurrenImg(this.imgBannerList);
      }, 3000);
    }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  // 顶部轮播背景
  getTopBg(imgItem:ImgVO) {
    return {
      'background': 'url(' + imgItem.url  + ') no-repeat '+ ' ' + imgItem.bgcolor +' center center / 1920px 80px',
    };
  }
  // 图片展示
  getCurrentImg(imgList:ImgVO[]) {
    let currentImg = null;
    imgList.forEach(item => {
      if (item.isAct) {
        currentImg = item; return;
      }
    });
    return this.getTopBg(currentImg);
  }
  // 当前图片banner
  setCurrenImg(oneList:ImgVO[]) {
    oneList.forEach((item) => {
      item.isAct = false;
    });
    oneList[this.curImg].isAct = true;
  }
}
export class ImgVO {
  id: string;
  url: string;
  bgcolor: string;
  isAct: boolean;
}

@NgModule({
  imports: [CommonModule],
  exports: [TopCarouselComponent],
  declarations: [TopCarouselComponent]
})
export class TopCarouselModule { }
