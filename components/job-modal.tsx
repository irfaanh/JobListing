"use client"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { JobInput, jobSchema } from "@/validators/jobSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useAction } from "next-safe-action/hooks"
import { createJob, updateJob } from "@/actions/job.actions"
import { useEffect, useState } from "react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { toast } from "sonner"


type JobModalProps = {
    isEdit?: boolean;
    initialData?: JobInput & { id: string };
    triggerLabel?: string;
}

export const JobModal = ({ isEdit = false, initialData, triggerLabel = "Add Job" }: JobModalProps) => {
    console.log(initialData?.id)
    
    const [open, setOpen] = useState(false);

    const form = useForm<JobInput>({
        resolver: zodResolver(jobSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            location: "",
            type: "full-time",
            companyName: "",
        },
    });

    useEffect(() => {
        if(isEdit && initialData) {
            form.reset(initialData);
        }
    },[isEdit, initialData,form]);
    

    const { execute, status } = useAction(isEdit ? updateJob : createJob, {
        onSuccess: () => {
            toast(isEdit ? "Job updated successfully" : "Job posted successfully",{
                description:"Sunday",
                action:{
                    label: "Undo",
                    onClick: () => {
                       return null
                    },
                }
            });
            form.reset();
            setOpen(false);
        },
        onError: () => {
            toast("An unexpected error occurred.");
        },
    });

    const onSubmit = (values: JobInput) => {
        const payload = isEdit && initialData?.id ? {...values, id: initialData.id } : values;
        execute(payload);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={isEdit ? "outline" : "default"}>{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Job" : "Add Job"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update the job details below." : "Fill in the job details to post."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        value={form.watch("type")}
                        onValueChange={(value) => form.setValue("type", value as JobInput["type"])}>
                            <SelectTrigger>
                                <SelectValue placeholder="select job type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Full Time</SelectItem>
                                <SelectItem value="part-time">Part Time</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea rows={5} {...form.register("description")} />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button type="submit">
                            {status === "executing" ? (isEdit ? "Updating..." : "Posting...") : (isEdit ? "Update Job" : "Post Job")}
                        </Button>
                            
                    </DialogFooter>
                </form>
            </DialogContent>
            
        </Dialog>
    )

}