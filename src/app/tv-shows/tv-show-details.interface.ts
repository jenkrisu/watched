export interface TvShowDetails {
    poster_path?: string;
    popularity?: number;
    id?: number;
    homepage?: string;
    backdrop_path?: string;
    vote_average?: number;
    overview?: string;
    first_air_date?: string;
    last_air_date?: string;
    origin_country?: string[];
    genres?: { name: string, id: number }[];
    original_language?: string;
    vote_count?: number;
    name?: string;
    original_name?: string;
    number_of_episodes?: number;
    number_of_seasons?: number;
    seasons?: {
        air_date?: string;
        episode_count: number;
        season_number: number;
    };
    status?: string;
    type?: string;
}
