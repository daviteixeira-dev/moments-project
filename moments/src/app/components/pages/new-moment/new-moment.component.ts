import { Component } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = "Compartilhar"

  constructor(private momentService: MomentService) {}

  async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image){
      formData.append('image', moment.image);
    }

    // todo

    // enviar para o service
    await this.momentService.createMoment(formData).subscribe();

    // exibir msg

    // redirect
  }
}
