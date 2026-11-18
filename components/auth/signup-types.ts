import type { AccountKind } from "./account-type-selection";
export type SignupDraft = {
  kind: AccountKind;
  name: string;
  phone: string;
  email: string;
  registration: string;
  firstName: string;
  lastName: string;
  representativeName: string;
  authorizationFile: File | null;
  acceptedTerms: boolean;
};
