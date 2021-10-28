export interface PokemonDetail {
    name: string,
    id: number,
    types: PokemonType[],
    sprites: PokemonSprites,
}

interface PokemonSprites {
    front_default: string,
    other: {
        home: {
            front_default: string
        }
    }
}

interface PokemonType {
    type: { name: string }
}