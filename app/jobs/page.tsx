import { getJobs } from "@/actions/job.actions";
import Jobpage from "@/components/JobCard";

const Page = async () => {
  const {data} = await getJobs();
  console.log(data);
  
  
  return (
  <>
    <Jobpage jobs={data?.data ?? []} />
  </>

  );
};

export default Page;
