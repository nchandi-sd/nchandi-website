import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Panel } from 'src/app/model/Panel';
import { PanelDialogComponent } from 'src/app/shared/components/panel-dialog/panel-dialog.component';
import { PanelService } from 'src/app/shared/services/panel.service';

@Component({
  selector: 'app-panel-dashboard',
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.scss']
})
export class PanelDashboardComponent implements OnInit, OnDestroy {
  panels$: Observable<Panel[]>;

  private subscription = new Subscription();

  constructor(
    private panels: PanelService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.panels$ = this.panels.getPanels();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPanelEdit(panel: Panel) {
    this.editItem$(panel).subscribe(result => {
      if (result) {
        this.updateItem(result);
      }
    });
  }

  onPanelSubmit(panel: Panel) {
    this.subscription.add(
      this.panels.addPanel(panel).subscribe()
    );
  }

  private updateItem(panel: Panel) {
    this.subscription.add(
      this.panels.updatePanel(panel.id, panel).subscribe()
    );
  }

  private editItem$(panel: Panel) {
    const dialogRef = this.dialog.open(PanelDialogComponent, {
      width: '450px',
      height: '720px',
      data: {
        panel,
      },
    });

    return dialogRef.afterClosed();
  }
}
