"use server";

import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/validators/jobSchema";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { actionClient } from "@/lib/safeAction";
import { z } from "zod";

export const createJob = actionClient.inputSchema(jobSchema)
    .action(async (values) => {
      try{
        const job = await prisma.job.create({
          data: values.parsedInput,
        });
        revalidatePath("/jobs");
        return { data: job };
      }catch (error) {
      console.error("Create Job Error:", error);
      return { error: "Something went wrong" };
      }
  });

  const jobUpdateSchema = jobSchema.extend({
  id: z.string(),
  });

  export const updateJob = actionClient.inputSchema(jobUpdateSchema)
      .action(async (values ) => {
        const {id , ...data} = values.parsedInput;
          try {
              const job = await prisma.job.update({
                  where: { id},
                  data
              });
              revalidatePath("/jobs");
              return { data: job };
          } catch (error) {
              console.error("Update Job Error:", error);
              return { error: "Something went wrong" };
          }
      });


  export const getJobs = actionClient.action(async () => {
      try {
        const jobs = await prisma.job.findMany({
          orderBy: { createdAt: "desc"}
      });
      return { data: jobs };
  }catch (error) {
      console.error("Get Jobs Error:", error);
    }
  });


const getJobByIdSchema = z.object({
  id: z.string(),
});


export const getJobById = actionClient.inputSchema(getJobByIdSchema).action(async (values) => {
    const { id } = values.parsedInput;
    if (!ObjectId.isValid(id)) {
        return { data: null };
    }
    const job = await prisma.job.findUnique({
        where: { id },
    });
    return { data: job};
});


export const deleteJob = actionClient.inputSchema(getJobByIdSchema).action(async (values) => {
    const { id } = values.parsedInput;
    if (!ObjectId.isValid(id)) {
        return null;
    }
    return await prisma.job.delete({
        where: { id },
    });
});

// export async function deleteJob(id: string) {
//   try {
//     const deleted = await prisma.job.delete({ where: { id } });
//     revalidatePath("/jobs");
//     return { data: deleted };
//   } catch (error) {
//     console.error("Delete Job Error:", error);
//     return { error: "Failed to delete job" };
//   }
// }
