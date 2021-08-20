import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Panel } from 'src/app/model/Panel';
import { PanelService } from 'src/app/shared/services/panel.service';

@Component({
  selector: 'app-panel-dashboard',
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.scss']
})
export class PanelDashboardComponent implements OnInit, OnDestroy{
  panels$: Observable<Panel[]>;

  private subscription = new Subscription();

  constructor(
    private panels: PanelService,
  ) { }

  ngOnInit() {
    this.panels$ = this.panels.getCurrentPanels();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPanelEdit(panel: Panel) {

  }

  onPanelSubmit(panel: Panel) {
    this.subscription.add(
      this.panels.addPanel(panel).subscribe()
    );
  }
}
