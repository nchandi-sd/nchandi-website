import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Panel } from 'src/app/model/Panel';
import { PanelService } from 'src/app/shared/services/panel.service';

@Component({
  selector: 'app-panel-dashboard',
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.scss']
})
export class PanelDashboardComponent implements OnInit {
  panels$: Observable<Panel[]>;

  constructor(private panels: PanelService) { }

  ngOnInit() {
    this.panels$ = this.panels.getCurrentPanels();
  }
}
