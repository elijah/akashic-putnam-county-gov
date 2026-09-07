// lib/connectors/putnam-county-gov/types.ts
export interface PutnamCountyData {
  meetings: CountyMeeting[];
  courtDockets: CourtDocket[];
  ordinances: Ordinance[];
  jobListings: JobListing[];
}

export interface CountyMeeting {
  id: string;
  type: 'county_meeting';
  title: string;
  date: string;
  source: string;
  reliability: string;
  content: string;
  outcomes: string[];
  voteResult: string;
}

export interface CourtDocket {
  id: string;
  type: 'court_docket';
  title: string;
  date: string;
  source: string;
  reliability: string;
  content: string;
  outcomes: string[];
  voteResult: string;
  courtDate: string;
  hearingRecord: string;
}

export interface Ordinance {
  id: string;
  type: 'ordinance';
  title: string;
  date: string;
  source: string;
  reliability: string;
  content: string;
  outcomes: string[];
  voteResult: string;
  effectiveDate: string;
  jurisdiction: string;
}

export interface JobListing {
  id: string;
  type: 'job_listing';
  title: string;
  date: string;
  source: string;
  reliability: string;
  content: string;
  salaryRange: string;
  department: string;
  outcomes: string[];
  voteResult: string;
}