const mongoose = require('mongoose');

// Define your application schema
const applicationSchema = new mongoose.Schema({
  jobs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
  },
  // Other application fields...
});

// Define your job schema
const jobSchema = new mongoose.Schema({
  title: String,
  // Other job fields...
});

// Define your mongoose models
const Application = mongoose.model('Application', applicationSchema);
const Job = mongoose.model('Job', jobSchema);

// Function to retrieve jobs for a specific applicant ID
async function getJobsForApplicant(applicantId) {
  try {
    // Find all applications that have the provided applicantId
    const applications = await  Application.find({ applicantId }).distinct('jobs')
   
    const jobsWithoutApplication = await Job.find({
      _id: { $nin: appliedJobIds },
    });

    return jobsWithoutApplication;
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    throw error;
  }
}

// Usage: Call the function and pass the applicant ID
getJobsForApplicant('your_applicant_id')
  .then(jobs => {
    console.log('Jobs without application:', jobs);
  })
  .catch(error => {
    console.error('Error:', error);
  });
