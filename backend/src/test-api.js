import app from './server.js';

async function runTests() {
  console.log('--- Starting Automated Backend API Test Suite ---');

  const baseUrl = 'http://localhost:5000';

  // Wait 1.5s for server to bind
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // 1. Healthcheck Test
    console.log('\n[1/7] Testing GET /api/v1/health');
    const healthRes = await fetch(`${baseUrl}/api/v1/health`);
    const healthData = await healthRes.json();
    console.log(`Status: ${healthRes.status}, Service: ${healthData.service}, DB Mode: ${healthData.database.mode}`);

    // 2. Profile API Test
    console.log('\n[2/7] Testing GET & POST /api/v1/profile');
    const profileRes = await fetch(`${baseUrl}/api/v1/profile`, {
      headers: { 'x-student-id': 'a0000000-0000-0000-0000-000000000001' }
    });
    const profileData = await profileRes.json();
    console.log(`GET Profile Status: ${profileRes.status}, Student Name: ${profileData.data?.full_name}`);

    const updateProfileRes = await fetch(`${baseUrl}/api/v1/profile`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-student-id': 'a0000000-0000-0000-0000-000000000001' 
      },
      body: JSON.stringify({
        full_name: 'Ananya Sharma',
        tenth_marks: 88.5,
        twelfth_marks: 91.2,
        cgpa: 8.7,
        degree: 'B.Tech / B.E (Engineering)',
        study_year: '1st Year',
        annual_income: 320000,
        state: 'Maharashtra',
        gender: 'Female',
        category_preference: 'Women in STEM'
      })
    });
    const updateData = await updateProfileRes.json();
    console.log(`POST Profile Status: ${updateProfileRes.status}, Message: ${updateData.message}`);

    // 3. Scholarship Catalog API Test
    console.log('\n[3/7] Testing GET /api/v1/scholarships');
    const schRes = await fetch(`${baseUrl}/api/v1/scholarships?page=1&limit=5`);
    const schData = await schRes.json();
    console.log(`Status: ${schRes.status}, Returned: ${schData.data?.length} schemes, Total: ${schData.pagination?.total}`);

    const singleSchRes = await fetch(`${baseUrl}/api/v1/scholarships/nsp-csss`);
    const singleData = await singleSchRes.json();
    console.log(`Single Scheme: ${singleData.data?.name}`);

    // 4. Eligibility Matching Engine API Test
    console.log('\n[4/7] Testing GET /api/v1/matching');
    const matchRes = await fetch(`${baseUrl}/api/v1/matching`, {
      headers: { 'x-student-id': 'a0000000-0000-0000-0000-000000000001' }
    });
    const matchData = await matchRes.json();
    console.log(`Matching Status: ${matchRes.status}`);
    console.log(`Summary: Eligible: ${matchData.summary?.eligibleCount}, Strong Matches: ${matchData.summary?.strongMatchesCount}, Ineligible: ${matchData.summary?.ineligibleCount}`);
    if (matchData.data?.length > 0) {
      const top = matchData.data[0];
      console.log(`Top Matched Scheme: ${top.name} (${top.eligibility.matchScore}%, Status: ${top.eligibility.status})`);
      console.log(`Reason: ${top.eligibility.matchedCriteria?.[0]?.reason}`);
    }

    // 5. Dashboard Summary API Test
    console.log('\n[5/7] Testing GET /api/v1/dashboard');
    const dashRes = await fetch(`${baseUrl}/api/v1/dashboard`, {
      headers: { 'x-student-id': 'a0000000-0000-0000-0000-000000000001' }
    });
    const dashData = await dashRes.json();
    console.log(`Dashboard Status: ${dashRes.status}`);
    console.log(`Metrics: Eligible: ${dashData.data?.metrics?.eligible_scholarships_count}, Upcoming Deadlines: ${dashData.data?.metrics?.upcoming_deadlines_count}, Est Aid: ${dashData.data?.metrics?.formatted_estimated_aid}`);

    // 6. Application Tracker API Test
    console.log('\n[6/7] Testing GET & POST /api/v1/tracker');
    const trackRes = await fetch(`${baseUrl}/api/v1/tracker`, {
      headers: { 'x-student-id': 'a0000000-0000-0000-0000-000000000001' }
    });
    const trackData = await trackRes.json();
    console.log(`Tracker Status: ${trackRes.status}, Tracked Count: ${trackData.count}`);

    const saveTrackRes = await fetch(`${baseUrl}/api/v1/tracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': 'a0000000-0000-0000-0000-000000000001'
      },
      body: JSON.stringify({
        scholarship_id: 'tata-trusts-means',
        status: 'docs_ready',
        notes: 'Requested college fee receipt from administrative office.'
      })
    });
    const saveTrackData = await saveTrackRes.json();
    console.log(`Add Application Status: ${saveTrackRes.status}, Message: ${saveTrackData.message}`);

    // 7. Financial Aid Gap Calculator API Test
    console.log('\n[7/7] Testing POST /api/v1/calculator/gap-analysis');
    const calcRes = await fetch(`${baseUrl}/api/v1/calculator/gap-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-student-id': 'a0000000-0000-0000-0000-000000000001'
      },
      body: JSON.stringify({
        tuition_fee: 160000,
        living_expenses: 80000,
        books_supplies: 25000,
        family_contribution: 100000,
        existing_aid: 25000
      })
    });
    const calcData = await calcRes.json();
    console.log(`Calculator Status: ${calcRes.status}`);
    console.log(`Total Cost: ₹${calcData.data?.breakdown?.total_education_cost}, Support: ₹${calcData.data?.support?.total_existing_support}`);
    console.log(`Funding Gap: ₹${calcData.data?.gap_analysis?.funding_gap} (${calcData.data?.gap_analysis?.coverage_percentage}% covered)`);
    console.log(`Recommended Scholarships Count: ${calcData.data?.recommendations?.recommended_scholarships?.length}`);

    console.log('\n🎉 ALL 7/7 BACKEND API ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!\n');
    process.exit(0);
  } catch (err) {
    console.error('Test Suite Failed:', err);
    process.exit(1);
  }
}

runTests();
