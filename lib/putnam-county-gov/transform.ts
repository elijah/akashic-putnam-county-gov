import { connector, fetch_result, transform_result } from "../connector";
import { event, source, evidence, entity, claim, relationship } from "../types";

export const putnam_county_gov_connector: connector = {
  source_name: "Putnam County Gov Data",
  source_type: "api",
  license_note: "Public government data from Putnam County TN",
  auth_required: false,
  rate_limit: { requests: 30, window_seconds: 60 },
  outputs: ["event", "entity", "claim", "source", "evidence"],

  async fetch(): Promise<fetch_result> {
    try {
      // TODO: Implement real scraping via Putnam County government APIs/websites
      // Example: Fetch from https://www.putnamcountytn.gov/
      // Using mock data for now until real endpoints are available
      const mockData = [
        {
          id: "meeting-2024-01-15",
          type: "county_meeting",
          title: "Putnam County Commission Regular Meeting",
          date: "2024-01-15T18:30:00Z",
          source: "/api/v1/county_meetings",
          reliability: "high",
          content: "Public hearing on the annual county budget with community input",
          outcomes: ["budget_approved", "tax_adjustment_deferred"],
          voteResult: "approved"
        },
        {
          id: "case-2024-001",
          type: "court_docket",
          title: "State v. Smith Township",
          date: "2024-01-10T09:30:00Z",
          source: "/api/v1/court_docket",
          reliability: "high",
          content: "Civil case regarding zoning violations and land use disputes",
          outcomes: ["settlement_reached"],
          voteResult: "not_present",
          courtDate: "2024-01-20",
          hearingRecord: "Preliminary motions and evidence presentation scheduled"
        },
        {
          id: "ordinance-2024-001",
          type: "ordinance",
          title: "New Zoning Regulations",
          date: "2024-01-15T16:00:00Z",
          source: "/api/v1/ordinances",
          reliability: "high",
          content: "Updated zoning codes allowing mixed-use development in downtown district",
          outcomes: ["ordinance_passed"],
          effectiveDate: "2024-07-01"
        },
        {
          id: "job-2024-001",
          type: "job_listing",
          title: "County Clerk Position - Records Manager",
          date: "2024-01-10T08:00:00Z",
          source: "/api/v1/job_listings",
          reliability: "high",
          content: "Administrative role for Putnam County Clerk",
          salaryRange: "$55,000 - $65,000",
          department: "Records Management",
          reliability: "high",
          content: "Responsible for maintaining county records and archives"
        }
      ];
      return { raw_payloads: mockData, fetch_timestamp: Date.now() };
    } catch (e: any) {
      return { raw_payloads: [], fetch_timestamp: Date.now(), error: e.message };
    }
  },

  transform(data: fetch_result): transform_result {
    const res: transform_result = {
      entities: [],
      events: [],
      claims: [],
      sources: [],
      evidences: [],
      relationships: []
    };

    if (!data.raw_payloads.length) {
      if (data.error) {
        console.error(`[connector:putnam_county_gov] fetch error: ${data.error}`);
      }
      return res;
    }

    const src: source = {
      id: "src_putnam_county_gov",
      name: "Putnam County Government",
      url: "https://www.putnamcountytn.gov/",
      type: "gov",
      reliability: 90,
      originality: 85,
      speed: 95,
      bias_risk: "low",
      state_affiliated: false,
      created_at: Date.now()
    };
    res.sources.push(src);

    for (const item of data.raw_payloads as any[]) {
      switch (item.type) {
        case "county_meeting": {
          const evt = {
            id: `evt_meeting_${item.id}`,
            title: item.title,
            summary: item.content || "",
            category: "politics",
            severity: item.reliability >= 70 ? "high" : "elevated",
            confidence: Math.min(0.9, 0.5 + (item.reliability / 100)),
            start_time: item.date,
            status: "active",
            created_at: Date.now()
          };
          res.events.push(evt);
          break;
        }
        case "court_docket": {
          const evt = {
            id: `evt_case_${item.id}`,
            title: item.title,
            summary: item.content || "",
            category: "conflict",
            severity: item.reliability >= 80 ? "high" : "elevated",
            confidence: Math.min(0.9, 0.7 + (item.reliability / 100)),
            start_time: item.date,
            status: "active",
            created_at: Date.now()
          };
          res.events.push(evt);
          break;
        }
        case "ordinance": {
          const evt = {
            id: `evt_ordinance_${item.id}`,
            title: item.title,
            summary: item.content || "",
            category: "politics",
            severity: item.reliability >= 80 ? "high" : "elevated",
            confidence: Math.min(0.9, 0.7 + (item.reliability / 100)),
            start_time: item.date,
            status: "active",
            created_at: Date.now()
          };
          res.events.push(evt);
          break;
        }
        case "job_listing": {
          const evd = {
            id: `evd_job_${item.id}`,
            source_id: src.id,
            url: `https://www.putnamcountytn.gov/jobs/${item.id}`,
            hash: item.id,
            fetched_at: data.fetch_timestamp,
            confidence: 0.8
          };
          res.evidences.push(evd);
          break;
        }
      }
    }

    // Add claims for events
    for (const evt of res.events) {
      const claim = {
        id: `claim_${evt.id}`,
        event_id: evt.id,
        text: `Putnam County ${evt.title} (${evt.category})`,
        summary: `Community impact: ${evt.title}`,
        type: "gov_statement",
        status: evt.status,
        confidence: 0.8,
        location_id: "putnam-county-tn",
        first_seen: evt.start_time,
        last_seen: evt.start_time
      };
      res.claims.push(claim);
    }

    // Add relationships (mentions)
    for (const evt of res.events) {
      const rel = {
        id: `rel_${evt.id}_${evt.title}`,
        src_id: evt.id,
        dst_id: evt.id,
        type: "mentions",
        confidence: 0.9,
        created_at: Date.now()
      };
      res.relationships.push(rel);
    }

    return res;
  }
};

export const putnam_county_gov_transform = (data: fetch_result): transform_result => {
  return putnam_county_gov_connector.transform(data);
};