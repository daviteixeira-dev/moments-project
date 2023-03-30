import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = "Compartilhar"

  constructor(
    private router: Router,
    private momentService: MomentService,
    private messagesService: MessagesService
  ) {}

  async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image){
      formData.append('image', moment.image);
    }

    // enviar para o service
    this.momentService.createMoment(formData).subscribe({
      next: () => {
          // exibir msg
          this.messagesService.add('Momento adicionado com sucesso!');
          // redirect
          this.router.navigate(['/']);
      }
    });
  }
}
