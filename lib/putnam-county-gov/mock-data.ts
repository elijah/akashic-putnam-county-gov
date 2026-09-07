// lib/connectors/putnam-county-gov/mock-data.ts
import { PutnamCountyData, CountyMeeting, CourtDocket, Ordinance } from './types';

export const mockMeetingData: CountyMeeting[] = [
  {
    id: 'meeting123',
    type: 'county_meeting',
    title: 'County Budget Hearing',
    date: '2023-06-15T14:00:00Z',
    source: '/api/v1/county_meetings',
    reliability: 'high',
    content: 'Public hearing on the annual county budget with community input',
    outcomes: ['budget_approved', 'tax_adjustment_deferred'],
    voteResult: 'approved'
  }
];

export const mockCourtDocket: CourtDocket[] = [
  {
    id: 'court456',
    type: 'court_docket',
    title: 'State v. Smith Township',
    date: '2023-06-14T09:30:00Z',
    source: '/api/v1/court_docket',
    reliability: 'high',
    content: 'Civil case regarding zoning violations and land use disputes',
    outcomes: ['settlement_reached'],
    voteResult: 'not_present',
    courtDate: '2023-06-20',
    hearingRecord: 'Preliminary motions and evidence presentation scheduled'
  }
];

export const mockOrdainedData: Ordinance[] = [
  {
    id: 'ord789',
    type: 'ordinance',
    title: 'New Zoning Regulations',
    date: '2023-06-10T16:00:00Z',
    source: '/api/v1/ordinances',
    reliability: 'high',
    content: 'Updated zoning codes allowing mixed-use development in downtown district',
    outcomes: ['ordinance_passed'],
    voteResult: 'yes',
    effectiveDate: '2023-07-01',
    jurisdiction: 'Putnam County'
  }
];