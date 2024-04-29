import { Category } from "./Category";

export class Task {
    id: number;
    title: string;
    description: string;
    creationDate: Date;
    completionDate: Date | null;
    type: string;
    category: Category | null;
    status: string;
    userId: number;
  
    constructor(id: number, title: string, description: string, creationDate: Date, completionDate: Date | null, type: string, category: Category | null, status: string, userId: number) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.creationDate = creationDate;
      this.completionDate = completionDate;
      this.type = type;
      this.category = category;
      this.status = status;
      this.userId = userId;
    }
  }