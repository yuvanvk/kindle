import * as z from "zod";

const createProject = z.object({
    repoDetails: {
        repoName: z.string().min(1),
        repoId: z.string(),
    },
    environmentVariables: {
        variables: z.array(z.record(z.string(), z.string()))
    }
});


type CreateProjectType = z.infer<typeof createProject>


export { createProject, type CreateProjectType }