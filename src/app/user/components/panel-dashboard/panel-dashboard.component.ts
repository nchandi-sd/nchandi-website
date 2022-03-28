import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
    private eleRef: ElementRef
  ) {
    if(Number(window.innerWidth.toString()[0]) <= 6 && window.innerWidth.toString().length === 3){
      var rowDivs = Array.from(document.querySelectorAll(".row"))
      rowDivs.map(row => row.classList.replace("row", "column"))
      var colMd6Divs = Array.from(document.querySelectorAll(".col-md-6"))
      colMd6Divs.map(col => col.classList.replace("col-md-6", "full"))
      this.eleRef.nativeElement.style.setProperty("--desiredWidth", "100%")
    } else if(Number(window.innerWidth.toString()[0]) > 6) {
      var columnDivs = Array.from(document.querySelectorAll(".column"))
      columnDivs.map(columnDiv => columnDiv.classList.replace("column", "row"))
      var full = Array.from(document.querySelectorAll(".full"))
      full.map(ful => ful.classList.replace("full", "col-md-6"))
      this.eleRef.nativeElement.style.setProperty("--desiredWidth", "initial")
    }
   }

  ngOnInit() {
    this.panels$ = this.panels.getPanels();
    this.panels$.subscribe(panel => console.table(panel))
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
