export default interface IUser {
    id?: any | null,
    email: string,
    password: string,
    roles?: Array<string>
};


// interface ISubjectFilter {
//   name: string;
//   email: string;
//   test: string;
//   result: "Прошёл" | "Не прошёл";
//   score: number;
//   percentage: `${number}%` | number;
// }