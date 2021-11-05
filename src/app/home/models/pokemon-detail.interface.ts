/* -------------------------------------------------------------------------- */
/*                       original api response structure                      */
/* -------------------------------------------------------------------------- */
export interface PokeApiDetail {
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

/* -------------------------------------------------------------------------- */
/*                          simplified datastructure                          */
/* -------------------------------------------------------------------------- */
export interface PokeDetail {
    name: string,
    id: number,
    types: string[],
    sprites: {
        main: string,
        other: string
    }
    //review propriedades opcionais precisam ser declaras?
    //other properties might be introduced via ...rest spreading
}