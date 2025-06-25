"use client";
import { Dialog, DialogContent, DialogDescription,
     DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteJob } from "@/actions/job.actions";

interface Props {
  jobId: string;
}

const DeleteJobDialog = ({ jobId }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteJob(jobId);
    setOpen(false);
    router.push("/jobs");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Delete Job</DialogTitle>
          <DialogDescription>Are you sure you want to delete this job?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobDialog;
