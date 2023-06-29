import {CoursePart} from "../types";


const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({part}: {part: CoursePart}) => {
    switch (part.kind) {
        case "background":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>{part.description}</i>
                    <br />
                    {part.backgroundMaterial}
                </div>
            );
        case "basic":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>{part.description}</i>
                </div>
            );
        case "group":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    Projects: {part.groupProjectCount}
                </div>
            );
        case "special":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>{part.description}</i>
                    <br />
                    Requirements: {part.requirements.join(', ')}
                </div>
            )
        default:
            return assertNever(part);
    }
}

export default Part;
