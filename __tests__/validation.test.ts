// lib/connectors/putnam-county-gov/validation.test.ts
import { fetchPutnamCountyGovernmentData } from './index';
import { mockMeetingData, mockCourtDocket, mockOrdainedData } from './mock-data';

describe('Putnam County Government Validation', () => {
  test('maps county meetings correctly', () => {
    const mockScraperResponse = mockMeetingData;
    const entities = fetchPutnamCountyGovernmentData(mockScraperResponse);
    
    expect(entities).toHaveLength(mockScraperResponse.length);
    
    const firstMeeting = entities[0];
    expect(firstMeeting.id).toBe('meeting123');
    expect(firstMeeting.title).toBe('County Budget Hearing');
    expect(firstMeeting.date).toEqual(expect.any(Date));
    expect(firstMeeting.outcomes).toContain('budget_approved');
  });
  
  test('parses ordinance documents properly', () => {
    const mockScraperResponse = mockOrdainedData;
    const entities = fetchPutnamCountyGovernmentData(mockScraperResponse);
    
    expect(entities).toHaveLength(mockScraperResponse.length);
    
    const ordinance = entities[0];
    expect(ordinance.title).toBe('New Zoning Regulations');
    expect(ordinance.voteResult).toBe('yes');
    expect(ordinance.content).toContain('commercial_development');
  });
  
  test('handles court docket entries', () => {
    const mockScraperResponse = mockCourtDocket;
    const entities = fetchPutnamCountyGovernmentData(mockScraperResponse);
    
    expect(entities).toHaveLength(mockScraperResponse.length);
    
    const courtCase = entities[0];
    expect(courtCase.title).toBe('State v. Smith Township');
    expect(courtCase.courtDate).toBe(mockScraperResponse[0].date);
    expect(courtCase.hearingRecord).toContain('plea_bargains');
  });
  
  test('returns empty array for no data', () => {
    const noDataResponse = { data: [] };
    const result = fetchPutnamCountyGovernmentData(noDataResponse);
    expect(result.length).toBe(0);
  });
});