import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { environment } from '../../environments/environment';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { Image } from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  height = 400;
  width = 400;
  grayscale = false;
  imgUrl = `${environment.imgUrl}`;

  images: Image[];
  imagesFiltered: Image[];
  selectedImage: Image;
  sizes: Array<any> = [];
  selectedSize: string;
  pageOfItems: Array<any>;

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private imagesService: ImagesService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit() {
    this.init();
  }

  onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    this.imagesService.getAll()
    .subscribe((images: Image[]) => {
      this.images = images;
    },
    (err) => console.error(err),
    () => {
      this.images.forEach((image: Image) => {
        this.sizes.push(image.width + ' x ' + image.height);
      });
      this.sizes = Array.from(new Set(this.sizes));
      this.sizes.sort((one, two) => (one > two ? 1 : -1));
      this.filterImages();
    });
  }

  filterImages() {

    if (!this.selectedSize) {
      this.imagesFiltered = this.images;
    } else {
      this.imagesFiltered = [];
      this.images.forEach((image: Image) => {
        if (this.selectedSize === image.width + ' x ' + image.height) {
          this.imagesFiltered.push(image);
        }
      });
    }
  }

  open(content) {
    this.modalService.open(content, this.modalOptions);
  }

}
