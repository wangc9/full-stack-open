import {CoursePartsEntry} from "../types";

const Total = ({courses}: {courses: CoursePartsEntry[]}) => {
  return (
    <div>
      Number of exercises
      {' '}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;
