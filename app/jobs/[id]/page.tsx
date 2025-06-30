// app/jobs/[slug]/page.tsx
import { getJobById } from '@/actions/job.actions'
import DeleteJobDialog from '@/components/jobs/DeleteJobDialog';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';


export interface PageParamsProps {
  params: Promise<{ id: string }>;
}


const Pages = async ({params}: PageParamsProps) => {
    const { id } = await params;

    if(!ObjectId.isValid(id)){
        notFound();
    }

    const {data} = await getJobById({id});
    console.log("Job Found :", data);

    
    if(!data){
        notFound();
    }
    const {data: job} = data;

    return (
        <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
            <h1 className="text-3xl font-bold">{job?.title}</h1>
            <p className="text-sm text-gray-600">
                {job?.companyName}
            </p>
            <p>
                {job?.location}
            </p>
            <p className="mt-2">{job?.description}</p>
            <div className="mt-3 text-sm">
                <span className="bg-black text-white px-2 py-1 rounded">{job?.type}</span>
            </div>
            {job?.id && <DeleteJobDialog jobId={job?.id} />}
        </main>
    )
}

export default Pages