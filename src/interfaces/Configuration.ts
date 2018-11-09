interface FolderConfiguration {
    generated: (p: string) => string,
    removal: (p: string) => string
}

interface Configuration {
    folders: FolderConfiguration
}