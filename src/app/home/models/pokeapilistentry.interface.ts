export interface PokeApiPageData {
    results: PageEntry[]
}

interface PageEntry {
    name: string,
    url: string,
}