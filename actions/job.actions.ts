"use server";

import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/validators/jobSchema";
import { JobInput } from "@/validators/jobSchema";
import { revalidatePath } from "next/cache";

export async function createJob(values: JobInput) {
  const parsed = jobSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  try {
    const job = await prisma.job.create({
      data: parsed.data,
    });

    revalidatePath("/jobs");
    return { data: job };
  } catch (error) {
    console.error("Create Job Error:", error);
    return { error: "Something went wrong" };
  }
}

// export function getJobs() {
//   return prisma.job.findMany({
//     orderBy: { createdAt: "desc" },
//   });
// }

export async function getJobs() {
  return await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobById(id: string) {
  return await prisma.job.findUnique({
    where: { id },
  });
}

export async function deleteJob(id: string) {
  try {
    const deleted = await prisma.job.delete({ where: { id } });
    revalidatePath("/jobs");
    return { data: deleted };
  } catch (error) {
    console.error("Delete Job Error:", error);
    return { error: "Failed to delete job" };
  }
}
