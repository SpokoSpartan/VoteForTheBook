import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../services/rest-service/rest.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private restService: RestService,
              private router: Router) { }

  ngOnInit() {
    this.confirmUser();
  }

  confirmUser() {
    const token = this.route.snapshot.paramMap.get('token');
    this.restService.post('user/confirm/' + token, null).subscribe();
    this.router.navigateByUrl('login');
  }
}
