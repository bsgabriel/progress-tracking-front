import { CourseChapter } from "./courseChapter";

export interface Course {
  id: number;
  name: string;
  desc: string;
  image: string;
  url: string;
  chapters: CourseChapter[];
}
