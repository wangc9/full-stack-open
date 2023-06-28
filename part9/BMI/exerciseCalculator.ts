interface exerciseInputValues {
  value1: number[];
  value2: number;
}

interface exerciseOutput {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseWebExerciseArguments = (arg1: string, arg2: number): exerciseInputValues => {
  console.log(arg1, arg2);
  const temp = arg1.replace('[', '').replace(']', '').split(',');
  const processedTemp = temp.map((entry) => entry.trim());
  if (temp.every((entry) => !isNaN(Number(entry))) && !isNaN(Number(arg2))) {
    const result = processedTemp.map((entry) => Number(entry));
    return {
      value1: result,
      value2: Number(arg2)
    };
  } else {
    throw new Error('Arguments are in wrong type. Both should be numbers!');
  }
};

const parseExerciseArguments = (args: string[]): exerciseInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error(`Too many arguments, expected 4, got ${args.length} instead`);

  const temp = args[2].replace('[', '').replace(']', '').split(',');
  const processedTemp = temp.map((entry) => entry.trim());
  if (temp.every((entry) => !isNaN(Number(entry))) && !isNaN(Number(args[3]))) {
    const result = processedTemp.map((entry) => Number(entry));
    return {
      value1: result,
      value2: Number(args[3])
    };
  } else {
    throw new Error('Arguments are in wrong type. Both should be numbers!');
  }
};

export const calculateExercise = (realExercises: number[], schedule: number): exerciseOutput => {
  const periodLength = realExercises.length;
  const trainingDays = realExercises.filter((entry) => entry > 0).length;
  const totalHours = realExercises.reduce((partial, a) => partial + a, 0);
  const scheduledHours = schedule * periodLength;
  const success = (scheduledHours <= totalHours);
  const rate = totalHours / scheduledHours;
  let rating = 0;
  let ratingDescription = '';
  if (rate < 0.5) {
    rating = 1;
    ratingDescription = 'Kom igen! You can do better!';
  } else if (rate >= 0.5 && rate < 1.0) {
    rating = 2;
    ratingDescription = 'Close enough! Keep on working!';
  } else {
    rating = 3;
    ratingDescription = "Wonderful! You've reached your goal!";
  }
  const target = schedule;
  const average = totalHours / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const {value1, value2} = parseExerciseArguments(process.argv);
  console.log(calculateExercise(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'ERROR:';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
