import {CoursePart} from "../types";
import Part from "./Part";

const Content = ({courses}: {courses: CoursePart[]}) => {
  return (
    <div>
      {courses.map((entry) => (
        <Part key={entry.name} part={entry} />
      ))}
    </div>
  );
};

export default Content;
