import { Injectable } from '@angular/core';

@Injectable()
export class PrivateKeyService {
  visible: boolean;
  key: string;

  constructor(private key: string) { this.visible = false; }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }


}
