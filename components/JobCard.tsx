"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  companyName: string;
  createdAt: Date;
};

interface JobpageProps {
  jobs: Job[];
}

const Jobpage = ({ jobs }: JobpageProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

    useEffect(() => {
        const filter = jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredJobs(filter);
    },[searchTerm, jobs]);

    console.log(filteredJobs);
    
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
    <div className="flex w-full items-center space-x-2 mt-4">
      <Input type="text" 
      placeholder="Search jobs..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />
      <Button type="submit">Search</Button>
    </div>
      <h1 className="text-3xl font-bold">All Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job) => (
            <li key={job.id} className="border p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.companyName}</p>
                <p>{job.location}</p>
              <p className="mt-2 text-sm text-gray-700">{job.description}</p>
              <div className="mt-3 text-sm">
                <span className="bg-black text-white px-2 py-1 rounded">{job.type}</span>
              </div>
              <Link href={`/jobs/${job.id}`} className="text-blue-600 mt-2 inline-block">Details</Link>
            </li>
          ))}
        </ul>
      )}
      <Link href={'jobs/new'}>
        <Button>Add Job
        </Button>
    </Link>
    </main>
  );
};

export default Jobpage;
