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
import { SortByPipe } from 'src/app/sort-by.pipe';
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

  sortDirection: boolean = true

  private subscriptions = new Subscription();

  constructor(private panelService: PanelService, private sortBy: SortByPipe) {}

  ngOnInit() {
    this.panels$ = this.panelService.getPanels();
    this.panels$.subscribe(value => console.log("value", value))
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

  onSortThisBy(action: string, members: AdminMember[]){
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(members, action, this.sortDirection)
  }
}
