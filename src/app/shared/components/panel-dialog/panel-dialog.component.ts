import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Panel } from 'src/app/model/Panel';

export interface PanelDialogContract {
  panel: Panel;
}

@Component({
  selector: 'app-panel-dialog',
  templateUrl: './panel-dialog.component.html',
  styleUrls: ['./panel-dialog.component.scss']
})
export class PanelDialogComponent {
  panel?: Panel;

  private panelId?: string;

  constructor(
    private dialogRef: MatDialogRef<PanelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PanelDialogContract
  ) {
    if (this.data && this.data.panel) {
      this.panel = this.data.panel;
      this.panelId = this.panel.id;
    }
  }

  onCancelButtonClick() {
    this.dialogRef.close(undefined);
  }

  onSaveButtonClick(panel: Panel) {
    panel.id = this.panelId;
    this.dialogRef.close(panel);
  }
}
