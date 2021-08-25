import {HICommitments} from './HICommitments';

export class AdminMember {
  firstName: string;
  lastName: string;
  commitment: HICommitments;
  phone: string;
  email: string;
  id: string;
  preferredContactMethod: 'text' | 'email';
}
