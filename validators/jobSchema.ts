import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(2),
  type: z.enum(["full-time", "part-time", "remote"]),
  companyName: z.string().min(2),
});

export type JobInput = z.infer<typeof jobSchema>;
