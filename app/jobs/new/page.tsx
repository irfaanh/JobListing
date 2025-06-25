import { JobForm } from "@/components/JobForm";

export default function NewJobPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Post a New Job</h1>
      <JobForm />
    </div>
  );
}
