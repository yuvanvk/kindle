import * as z from "zod";

const createProject = z.object({
    repoDetails: z.object({
        repoId: z.number(),
        isFork: z.boolean()
    }),
    environmentVariables: z.array(z.record(z.string(), z.string()))
});


type CreateProjectType = z.infer<typeof createProject>

export { createProject, type CreateProjectType }