export interface MovieDetails {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: object;
    budget?: number;
    genres?: { id: number, name: string}[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_title?: string;
    original_language?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    revenue?: number;
    runtime?: number;
    status?: string;
    tagline?: string;
    title?: string;
    vote_count?: number;
    video?: boolean;
    vote_average?: boolean;
}
