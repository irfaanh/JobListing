import { getJobs } from "@/actions/job.actions";
import Jobpage from "@/components/JobCard";

const Page = async () => {
  const jobs = await getJobs();

  return (
  <>

    <Jobpage jobs={jobs} />
    
  </>

  );
};

export default Page;
