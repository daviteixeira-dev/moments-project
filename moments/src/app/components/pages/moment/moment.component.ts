import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { faTimesCircle, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faEdit = faEdit;
  faTimesCircle = faTimesCircle;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ){}

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));

      this.commentForm = new FormGroup({
        text: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required])
      });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    this.momentService.removeMoment(id).subscribe({
      next: () => {
        this.messagesService.add('Momento excluído com sucesso!');
        this.router.navigate(['/']);
      }
    });
  }

  async onSubmit(formDirective: FormGroupDirective) {

    if(this.commentForm.invalid){
      return
    };

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    this.commentService.createComment(data).subscribe({
      next: (comment) => {
        this.moment!.comments!.push(comment.data)
        this.messagesService.add("Comentário adicionado!");
        //reseta o form
        this.commentForm.reset();
        formDirective.resetForm();
      }
    });
  }
}
