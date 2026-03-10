export interface ServiceResult {
  id: string;
  name: string;
  organisation?: string;
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  location?: string;
  eligibility?: string;
  eligibilityList?: string[];
  hours?: string;
  status?: string;
  tags?: string[];
  accessibility?: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  /** If set, jump to this question next */
  next?: string;
  /** If set, show these service results */
  services?: string[];
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
}

export interface FlowData {
  questions: Question[];
  services: ServiceResult[];
}
