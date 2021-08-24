import { AdminMember } from './AdminMember';
import { Facility } from './Facility';

export class Panel {
  id: string;

  dayOfWeek: string;
  weekOfMonth: number;
  eventTime: string;

  location: string;
  gender: string;
  facility: Facility;
  boardChampion: AdminMember;
  panelCoordinator: AdminMember;
  panelLeader: AdminMember;
  panelMember1: AdminMember;
  panelMember2: AdminMember;
  panelMember3: AdminMember;
  panelMember4: AdminMember;
  panelMember5: AdminMember;

  markAsMembersNeeded: boolean;
  numberNeeded?: number;

  facilityId: string;
  boardChampionId: string;
  panelCoordinatorId: string;
  panelLeaderId: string;
  panelMember1Id: string;
  panelMember2Id: string;
  panelMember3Id: string;
  panelMember4Id: string;
  panelMember5Id: string;
}
