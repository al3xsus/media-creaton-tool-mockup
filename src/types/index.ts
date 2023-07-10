export enum Stages {
    Intro,
    Target,
    Architecture,
    Destination,
    Download,
    Outro
}

export type BtnConfig = {
    forwardBtn: any;
    backBtn: any;
}

export type TargetProps = {
    chosenTarget: "ISO" | "media" | null,
    onTargetChange: any
}

export type ArchitectureProps = {
    architecture: "x32" | "x64" | "ARM" | null,
    onArchitectreChange: any
}