export interface PokeApiPageData {
    results: PageEntry[]
    next: string,
}

interface PageEntry {
    name: string,
    url: string,
}