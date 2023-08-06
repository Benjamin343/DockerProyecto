import { Component, OnInit, Input } from '@angular/core';
import { Emisor } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-emisores',
  templateUrl: './emisores.component.html',
  styleUrls: ['./emisores.component.scss'],
})
export class EmisoresComponent implements OnInit {
  @Input() emisores: Emisor[] = [];
  constructor() { }

  ngOnInit() {
    //console.log(this.emisores);
  }

}
