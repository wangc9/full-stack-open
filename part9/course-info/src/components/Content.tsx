import {CoursePartsEntry} from "../types";

const Content = ({courses}: {courses: CoursePartsEntry[]}) => {
  return (
    <div>
      {courses.map((entry) => (
        <div key={entry.name}>
          {entry.name} {entry.exerciseCount}
        </div>
      ))}
    </div>
  );
};

export default Content;
