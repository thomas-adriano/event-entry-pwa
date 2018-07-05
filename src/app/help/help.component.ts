import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppNavigationService } from '@app/core';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public errorMsg = '';

  constructor(
    private appNavigationService: AppNavigationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.errorMsg = data.errorMsg;
    });
  }

  goToEnd() {
    this.appNavigationService.navigateTo('welcome');
  }

  goToMoreInfo() {
    alertify.alert(
      `<span class="printer-config__msg-toast">${this.errorMsg}</span>`,
      () => {}
    );
  }
}
