import { AdminMember } from './AdminMember';
import { Facility } from './Facility';

export class Panel {
  id: string;

  eventDate: Date;
  location: string;
  gender: string;
  numberNeeded: number;
  panelMemberCount: number;
  facility: Facility;
  boardChampion: AdminMember;
  panelCoordinator: AdminMember;
  panelMembers: AdminMember[];

  facilityId: string;
  boardChampionId: string;
  panelCoordinatorId: string;
}
