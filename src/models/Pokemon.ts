export interface Pokemon {
    name: string;
    url: string;
    image: string | null;
}
export interface PokemonDetail {
    abilities: AbilitySlot[];
    base_experience: number;
    cries: PokemonCries;
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    moves: PokemonMove[];
}

export interface AbilitySlot {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    order: number | null;
    version_group: NamedAPIResource;
}
