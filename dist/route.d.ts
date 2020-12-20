/// <reference types="react" />
export declare type AdditionalProps = {
    readonly ICON?: JSX.Element;
    readonly LABEL?: string;
    readonly REDIRECT?: string;
};
export declare type MandateProps = {
    readonly PATH: string;
    readonly NAME: string;
};
export declare type RouteProps = MandateProps & AdditionalProps;
export declare class Route implements RouteProps {
    readonly NAME: string;
    readonly PATH: string;
    readonly REDIRECT?: string;
    readonly LABEL?: string;
    readonly ICON?: JSX.Element;
    isPrevious: boolean;
    constructor(name: MandateProps["NAME"], path: MandateProps["PATH"], additionalProps?: AdditionalProps);
    get isCurrent(): boolean;
    isEnter: (path?: string) => boolean;
}
