
import { getJobById } from '@/actions/job.actions'
import DeleteJobDialog from '@/components/jobs/DeleteJobDialog';
import { notFound } from 'next/navigation';

const JobDetails = async ({params}:{params : {id:string}}) => {
    const JobById = await getJobById(params.id)
    console.log(JobById);    

    if(!JobById) {
        notFound();
    }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{JobById?.title}</h1>
      <p className="text-sm text-gray-600">
        {JobById?.companyName} 
    </p>
    <p>
        {JobById?.location}
      </p>
      <p className="mt-2">{JobById?.description}</p>
      <div className="mt-3 text-sm">
        <span className="bg-black text-white px-2 py-1 rounded">{JobById?.type}</span>
      </div>
      {JobById?.id && <DeleteJobDialog jobId={JobById?.id} />}
    </main>
  )
}


export default JobDetails