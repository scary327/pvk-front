export interface Skill {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  rating: number;
}

export interface FileStatus {
  name: string;
  status: "idle" | "loading" | "error";
  error?: string;
}

export interface RatingStarsProps {
  rating: number;
}

export interface FileUploaderProps {
  onFileUpload?: (file: File) => void;
}
