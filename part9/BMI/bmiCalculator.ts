interface bmiInputValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: string[]): bmiInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error(`Too many arguments, expected 4, got ${args.length} instead`);

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Arguments are in wrong type. Both should be numbers!');
  }
};

export const bmiCalculator = (height: number, mass: number): string => {
  const bmi: number = mass / Math.pow(height / 100, 2);
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17.0 && bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return 'Normal range (Healthy weight)';
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30.0 && bmi < 35.0) {
    return 'Obese (Class I)';
  } else if (bmi >= 35.0 && bmi < 40.0) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const {value1, value2} = parseBmiArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'ERROR:';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
