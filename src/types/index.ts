// export default interface IUser {
//     id?: any | null,
//     email: string,
//     password: string,
//     roles?: Array<string>
// };

export default interface ITest {
    title: string,
    startAt: Date,
    endAt: Date,
    scoreToPass: number,
    manualCheck: boolean,
    questions: [
    {
      questionText: string,
      type: number,
      mark: 1 | 0,
      order: number,
      createAnswer: {
        textAnswer: string,
        multipleAnswer?: string[],
        matchingPairs?: {}
      }
    }],
}

// interface ISubjectFilter {
//   name: string;
//   email: string;
//   test: string;
//   result: "Прошёл" | "Не прошёл";
//   score: number;
//   percentage: `${number}%` | number;
// }