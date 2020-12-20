import { Route } from "./route";
export declare type Routes = {
    [key: string]: Route;
};
declare const setPreviousRoute: (routes: Routes) => void;
export { setPreviousRoute };
