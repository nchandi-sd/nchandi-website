export class Facility {
  id: string;
  active: boolean;
  facilityName: string;
  facilityType: 'Correctional' | 'Treatment';
  address: string;
  city: string;
  state: string;
  mainContactEmail: string;
  mainContactName: string;
  mainContactPhone: string;
  alternateContactEmail: string;
  alternateContactName: string;
  alternateContactPhone: string;
  website: string;
}
