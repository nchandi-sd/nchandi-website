import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminMember } from 'src/app/model/AdminMember';
import { Panel } from 'src/app/model/Panel';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss'],
})
export class PanelListComponent implements OnInit, OnDestroy {
  @Output()
  edit = new EventEmitter<Panel>();

  panels$: Observable<Panel[]>;

  private subscriptions = new Subscription();

  constructor(private panelService: PanelService) {}

  ngOnInit() {
    this.panels$ = this.panelService.getPanels();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onDeleteItem(panel: Panel) {
    this.subscriptions.add(this.panelService.deletePanel(panel.id).subscribe());
  }

  onEditItem(panel: Panel) {
    this.edit.emit(panel);
  }

  getMemberName(user: AdminMember) {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return '';
  }
}