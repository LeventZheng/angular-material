import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  HostListener
} from '@angular/core';
import { Ng2Uploader, UploadRejected } from '../services/ng2-uploader';

@Directive({
  selector: '[ngFileDrop]'
})
export class NgFileDropDirective {

  @Input() events: EventEmitter<any>;
  @Output() filterFilesExt: EventEmitter<any> = new EventEmitter();
  @Output() maxSizeExcption: EventEmitter<any> = new EventEmitter();
  @Output() onUpload: EventEmitter<any> = new EventEmitter();
  @Output() onPreviewData: EventEmitter<any> = new EventEmitter();
  @Output() onFileOver:EventEmitter<any> = new EventEmitter();
  // @Output() onUploadRejected: EventEmitter<UploadRejected> = new EventEmitter<UploadRejected>();

   _options:any;

  get options(): any {
    return this._options;
  }

  @Input('options')
  set options(value: any) {
    this._options = value;
    this.uploader.setOptions(this.options);
  }

  files: any[] = [];
  uploader: Ng2Uploader;

  constructor(public el: ElementRef) {
    this.uploader = new Ng2Uploader();
    setTimeout(() => {
      this.uploader.setOptions(this.options);
    });

    this.uploader._emitter.subscribe((data: any) => {
      this.onUpload.emit(data);
      // this.filterFilesExt.emit(data);
      if (data.done) {
        this.files = this.files.filter(f => f.name !== data.originalName);
      }
    });

    this.uploader._previewEmitter.subscribe((data: any) => {
      this.onPreviewData.emit(data);
    });

    setTimeout(() => {
      if (this.events instanceof EventEmitter) {
        this.events.subscribe((data: string) => {
          if (data === 'startUpload') {
            this.uploader.uploadFilesInQueue();
          }
        });
      }
    });

    this.initEvents();
  }

  initEvents(): void {
    if (typeof this.el.nativeElement.addEventListener === 'undefined') {
      return;
    }

    this.el.nativeElement.addEventListener('drop', (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      this.files = Array.from(e.dataTransfer.files);
      if (this.options.filterExtensions && this.options.allowedExtensions) {
        this.filterFilesByExtension();
      }

      if(this.options.maxFileSize ){
        this.filterFilesByMaxSize();
      }
      if (this.files.length) {
        this.uploader.addFilesToQueue(this.files);
      }
    }, false);

    this.el.nativeElement.addEventListener('dragenter', (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    }, false);

    this.el.nativeElement.addEventListener('dragover', (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    }, false);
  }

  filterFilesByExtension(): void {
    this.files = this.files.filter(f => {
      if (this.options.allowedExtensions.indexOf(f.type) !== -1) {
        return true;
      }

      let ext: string = f.name.split('.').pop();
      if (this.options.allowedExtensions.indexOf(ext.toLowerCase()) !== -1 ) {
        return true;
      }

      this.filterFilesExt.emit({file: f, reason: UploadRejected.EXTENSION_NOT_ALLOWED});

      return false;
    });
  }

  filterFilesByMaxSize(): void {
    this.files = this.files.filter(f => {
      if( f.size <= (this.options.maxFileSize * 1024 * 1024)){
        return true;
      }

      this.maxSizeExcption.emit({file: f, reason: '上传的文件大小不能超过'+this.options.maxFileSize+"M"})
      return false;
    })
  }

  @HostListener('change') onChange(): void {
    this.files = Array.from(this.el.nativeElement.files);

    if (this.options.filterExtensions && this.options.allowedExtensions) {
      this.filterFilesByExtension();
    }

    if(this.options.maxFileSize ){
      this.filterFilesByMaxSize();
    }

    if (this.files.length) {
      this.uploader.addFilesToQueue(this.files);
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragOver():void {
    this.onFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave():any {
    this.onFileOver.emit(false);
  }

}
