interface FolderConfiguration {
    generated: (p: string) => string,
    removal: (p: string) => string
    extension: (p: string, ext: string) => string
}

interface Configuration {
    folders: FolderConfiguration
}