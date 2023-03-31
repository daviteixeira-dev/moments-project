import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MomentService } from 'src/app/services/moment.service';
import { faTimesCircle, faEdit } from '@fortawesome/free-regular-svg-icons';

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

  constructor(private momentService: MomentService, private route: ActivatedRoute){}

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
  }
}
