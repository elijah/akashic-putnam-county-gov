import { civicEntityType } from './types';

// Mock implementation of fetchPutnamCountyGovernmentData
export function fetchPutnamCountyGovernmentData(mockData: any): any[] {
  return mockData.map(item => {
    return {
      id: item.id || String(Date.now()),
      title: item.title || 'Default Title',
      date: new Date(item.date || '2023-01-01'),
      outcomes: item.outcomes || [],
      voteResult: item.voteResult || 'not_present',
      type: 'civic_entity',
      engagementScore: Math.floor(Math.random() * 100),
      numComments: Math.floor(Math.random() * 10)
    };
  });
}

// Basic type implementations
class PutnamCountyData {
  constructor(mapping?) {
    this.meetings = mapping.meetings || [];
    this.courtCases = mapping.courtCases || [];
    this.ordinances = mapping.ordinances || [];
  }

  getMeetings() { return this.meetings; }
  getCourtCases() { return this.courtCases; }
  getOrdinances() { return this.ordinances; }
}

// Export required types
export { PutnamCountyData, CountyMeeting, Ordinance, CourtCase };

// Export mock data objects
const mockPutnamCountyData = {
  meetings: mockMeetingData,
  courtCases: mockCourtDocket,
  ordinances: mockOrdainedData
};
export { mockPutnamCountyData };