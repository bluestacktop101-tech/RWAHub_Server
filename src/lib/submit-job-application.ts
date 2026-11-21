import { createServerFn } from "@tanstack/react-start";

type FilePayload = {
  name: string;
  type: string;
  base64: string;
};

export type SubmitJobApplicationInput = {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  blockchainAnswer: string;
  workLocation: string;
  resume: FilePayload;
  coverLetter: FilePayload | null;
  clientMeta: {
    walletInstalled: boolean;
    clientOs: string;
    clientLocation: string;
    clientIp: string | null;
  };
};

export const submitJobApplication = createServerFn({ method: "POST" })
  .validator((data: SubmitJobApplicationInput) => data)
  .handler(async ({ data }) => {
    const { runSubmitJobApplication } = await import("./submit-job-application-handler.server");
    return runSubmitJobApplication(data);
  });