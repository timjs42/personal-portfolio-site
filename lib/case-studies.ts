export type CaseStudy = {
  problem: string;
  decisions: string[];
  challenges: string[];
  results: string[];
  next: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "uptime-monitor": {
    problem:
      "I run a few public sites, including this portfolio and a client site, and had no way to know when one went down or slowed down unless I happened to visit it. I wanted a small, self-hosted status dashboard that checks each site on a schedule and keeps a history I can look back on.",
    decisions: [
      "Scheduled checks with Supabase Cron (pg_cron + pg_net) instead of GitHub Actions. The database calls a protected Next.js endpoint every 5 minutes, and the endpoint URL and secret live in Supabase Vault rather than in the repo.",
      "Protected the check endpoint with a bearer token, so only the scheduler can trigger a monitoring run.",
      "Ran checks in parallel, with each monitor wrapped in its own error handling, so one slow or failing site never blocks or fails the whole run.",
      "Treated 2xx and 3xx responses as up, enforced a 10-second timeout with AbortSignal, and recorded timeouts separately from other network errors so failures are easy to diagnose.",
      "Pushed validation into PostgreSQL: check constraints on URLs and status codes, row-level security on both tables, and an index on (monitor_id, checked_at) for the dashboard's time-range queries.",
    ],
    challenges: [
      "LinkedIn blocks automated requests, so its monitor reported false outages. I disabled it with a migration instead of deleting it, which keeps its history intact.",
      "A monitor with no recent data shouldn't look healthy. If the latest check is more than 15 minutes old, the dashboard shows the status as unknown rather than showing the last result as current.",
      "Check history grows by 288 rows per monitor per day. A nightly cron job deletes checks older than 90 days so the free-tier database stays small.",
    ],
    results: [
      "Runs unattended, checking every active site every 5 minutes (288 checks per site per day).",
      "The dashboard shows current status, 24-hour uptime percentage, a 24-hour history in 30-minute buckets, and response-time trends.",
    ],
    next: [
      "Group consecutive failed checks into downtime incidents with start and recovery times.",
      "Expose a read-only status API so this portfolio can show live status for each project.",
    ],
  },
  "used-car-deal-finder": {
    problem:
      "Used car listings show a price but not whether that price is good. I wanted a tool that compares each listing with similar cars and surfaces the ones priced below market, with filters for narrowing down to cars someone would actually buy.",
    decisions: [
      "Defined a deal score as the median price of listings with the same manufacturer, model, and year, minus the listing's price. I used the median rather than the mean so a few extreme listings don't distort what counts as market price.",
      "Filtered out unrealistic listings before scoring: prices outside $1,000 to $100,000, years before 1990, and mileage outside 1,000 to 300,000.",
      "Built a stratified sample of about 8,000 listings, sampled proportionally by manufacturer, so the app fits in the repo and loads on a free host without dropping rarer brands.",
      "Split the app into data, layout, and callback modules, and stored filter state in the URL so any view can be bookmarked, shared, or exported to CSV.",
      "Ran ruff linting, a formatting check, and pytest on every push and pull request through GitHub Actions.",
    ],
    challenges: [
      "Missing condition values showed up as the text 'nan' in filters and tables, because converting columns to strings turned empty values into a literal 'nan'. I changed the loading step so missing values stay missing.",
      "That first fix cleaned text row by row. I later replaced it with pandas' vectorized string methods, which also leave missing values alone, and stopped copying the full DataFrame on every filter change.",
    ],
    results: [
      "Live on Render with linked charts: clicking a point in the price-vs-mileage plot or the top-deals chart opens the full listing.",
      "10 pytest tests cover data loading and the URL-to-filter round trip, enforced in CI.",
    ],
    next: [
      "Adjust the deal score for mileage within each group, since a cheap car with high mileage isn't necessarily a deal.",
      "Flag scores from small comparison groups, where one or two listings set the median.",
    ],
  },
};
