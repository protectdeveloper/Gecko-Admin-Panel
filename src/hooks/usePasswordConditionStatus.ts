type PasswordConditionStatus = {
  isLengthValid: boolean;
  doesNotStartWithZero: boolean;
  isNotSequential: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  passedCount: number;
  progressColor: string;
  progressValue: number;
  isMatching: boolean;
};

export const useGetPasswordConditions = (
  password: string,
  rePassord: string
): PasswordConditionStatus => {
  const trimmed = password.trim();

  if (!trimmed) {
    return {
      isMatching: false,
      isLengthValid: false,
      doesNotStartWithZero: false,
      isNotSequential: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      passedCount: 0,
      progressColor: "#D1D5DB",
      progressValue: 0,
    };
  }

  const isLengthValid = trimmed.length >= 8;
  const doesNotStartWithZero = !trimmed.startsWith("0");
  const isNotSequential = !/(012|123|234|345|456|567|678|789|890|098)/.test(
    trimmed
  );
  const hasUppercase = /[A-Z]/.test(trimmed);
  const hasLowercase = /[a-z]/.test(trimmed);
  const hasNumber = /[0-9]/.test(trimmed);

  const isMatching = password === rePassord;

  const conditions = [
    isLengthValid,
    doesNotStartWithZero,
    isNotSequential,
    hasUppercase,
    hasLowercase,
    hasNumber,
    isMatching,
  ];

  const passedCount = conditions.filter(Boolean).length;

  const progressColor =
    passedCount <= 2
      ? "#EF4444"
      : passedCount <= 4
      ? "#FACC15"
      : passedCount === 6
      ? "#22C55E"
      : "#D1D5DB";

  const progressValue = (passedCount / 6) * 100;

  return {
    isLengthValid,
    doesNotStartWithZero,
    isNotSequential,
    hasUppercase,
    hasLowercase,
    hasNumber,
    passedCount,
    progressColor,
    progressValue,
    isMatching,
  };
};
