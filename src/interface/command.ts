export interface Command {
    name: string,
    description: string,
    category: string,
    options?: CommandOption[],

    execute: Promise<void>
}

export interface CommandOption {
    type: number,
    name: string,
    description: string,
    require: boolean,
    options: CommandOption[]
}