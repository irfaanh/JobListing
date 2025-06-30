"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { JobModal } from "./job-modal";
import { CiLocationOn } from "react-icons/ci";
import { TinyColor } from "@ctrl/tinycolor";
import { Checkbox } from "@/components/ui/checkbox"

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
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [selectedType, setSelectedType] = useState<string[]>([]);
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

    console.log(selectedType);
    

    const generateColorFromId = (id: string) => {
      const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const hue = hash % 360;
      return new TinyColor({ h: hue, s: 60, l: 70 }).toHexString();
    };

    const handleTypeChange = (type: string, checked: boolean) => {
      setSelectedType((prev) => {
        return checked ? [...prev, type] : prev.filter(t => t !== type); 
      })
    };

    const handleJobSelection = (title: string) => {
      setSelectedJobs((prev) => {
        return prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title];
      })
    }

    useEffect(() => {
        const filter = jobs.filter(job => {
        const matchSearch =  job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchedTypes = selectedType?.length === 0 || selectedType?.includes(job.type);
        const matchedTitle = selectedJobs.length === 0 || selectedJobs.some((title) => job.title.toLowerCase().includes(title.toLowerCase()));
        return matchSearch && matchedTypes && matchedTitle;
      });
        setFilteredJobs(filter);
    },[searchTerm, selectedType,selectedJobs,jobs]);
    
  return (
    <div>
      <div className=" flex justify-center" style={{backgroundColor: "#6F2DA8"}}>
        <div className="py-6 px-4 w-full max-w-2xl">
        <h3 className="text-3xl text-center font-semibold mb-3 text-white">Find Your Dream Jobs Here</h3>

        <div className="flex items-center  w-full">
          <Input
            className="bg-white rounded-l-full"
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
          className="rounded-r-full bg-black text-white border-3 border-black"
           type="submit">Search</Button>
        </div>
        </div>
      </div>

      <div className="flex h-screen overflow-hidden" style={{backgroundColor: "#F5F5DC"}}>
      <aside className="w-64 border-r p-4  sticky top-0 h-screen flex flex-col px-10">
          <div className="flex flex-col justify-center items-start mt-6">
            <div className="flex flex-col justify-center border rounded-lg p-4 text-white w-full py-8 shadow" style={{backgroundColor: "#6F2DA8"}}>
              <h3 className="text-2xl ">
                Get Your Best <br /> Profession <br /> with ours
              </h3>
              <Button className="rounded-full mt-4">
                Learn more
              </Button>
            </div>
          <div className="mt-8">
              <h2 className="text-lg font-semibold">Filter</h2>
                <div className="space-y-2">
                   <p className="underline">Job Type</p>
                  {["full-time", "part-time", "remote"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                      id={type}
                      checked={selectedType?.includes(type)}
                      onCheckedChange={(checked) => {
                        handleTypeChange(type, Boolean(checked));
                      }}/>
                      <label htmlFor={type} className="capitalize text-sm"
                      >{type}</label>
                    </div>
                  ))}
                </div>
            </div>
          </div>
      </aside>
      <div className="flex-1 overflow-y-auto p-6 px-10">
        
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold inline">Recommended jobs</h1>
            <Dialog>
                <JobModal />
            </Dialog>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 my-4">
                {[
                  "DATA ANALYST",
                  "PHP DEVELOPER",
                  "FLUTTER DEVELOPER",
                  "DOT NET DEVELOPER",
                  "NODE JS DEVELOPER",
                  "SOFTWARE DEVELOPER",
                ].map((job, index) => {
                  const isSelected = selectedJobs.includes(job);
                  return (
                    <div
                    key={index}
                    onClick={() => handleJobSelection(job)}
                    className={`cursor-pointer px-3 py-1 text-sm border rounded-sm ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-[#F5F5DC] text-gray-800 border-gray-400"
                    }`}
                    >
                    {job}
                    </div>
                );
                })}
              </div>
          </div>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs available.</p>
          ) : (
              
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => {
                  const jobColor = generateColorFromId(job.id);
                  return (
                  <li key={job.id} 
                  className="flex flex-col justify-between rounded-lg p-4 border"
                  style={{ backgroundColor: jobColor, flex:"1 1 100%"}}>
                    <div>
                      <p className="text-sm text-gray-600">{job.companyName}</p>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="mt-2 text-sm text-gray-700">{job.description}</p>
                      <div className="mt-3 text-sm">
                      <span className="border border-black text-black px-2 py-1 rounded-full">{job.type}</span>
                      </div>
                      <Link href={`/jobs/${job.id}`} className="text-blue-600 mt-2 inline-block">Details</Link>
                      <hr className="my-3 border-t-1 border-gray-500"/>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <CiLocationOn/>
                        <p className="text-black font-light">{job.location}</p>
                      </div>

                    <JobModal
                      isEdit
                      initialData={{
                        ...job,
                        id: job.id,
                        type:
                          job.type === "full-time" ||
                          job.type === "part-time" ||
                          job.type === "remote"? job.type : "full-time",
                      }}
                      triggerLabel={"Edit Job"}
                    />
                    </div>
                  </li>
              )})}
              </ul>
          )}
        </div>
    </div>
    </div>
  );
};

export default Jobpage;
