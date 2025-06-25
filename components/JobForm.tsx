"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, JobInput } from "@/validators/jobSchema";
import { createJob } from "@/actions/job.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export const JobForm = () => {
  const form = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "full-time",
      companyName: "",
    },
  });

  const onSubmit = async (values: JobInput) => {
    const res = await createJob(values);

    if ("error" in res) {
      toast.error(res.error ?? "An unexpected error occurred.");
    } else {
      toast.success("Job posted successfully");
      form.reset();

    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto mt-10">
      <div>
        <Label>Job Title</Label>
        <Input {...form.register("title")} />
      </div>
      <div>
        <Label>Company Name</Label>
        <Input {...form.register("companyName")} />
      </div>
      <div>
        <Label>Location</Label>
        <Input {...form.register("location")} />
      </div>
      <div>
        <Label>Job Type</Label>
        <Select
          defaultValue={form.getValues("type")}
          onValueChange={(value) => form.setValue("type", value as JobInput["type"])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="part-time">Part-Time</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea rows={5} {...form.register("description")} />
      </div>

      <Button type="submit">Post Job</Button>
    </form>
  );
};
