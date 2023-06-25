export interface Favourite{
    id: number;
    favourite_id: number;
    favourite_type: string;
    created_at: string;
    user: string;
}

export interface FavouriteDB{
    id: number;
    favourite_id: number;
    favourite_type: string;
    created_at: string;
    User: {
        username: string;
    } ;
}

