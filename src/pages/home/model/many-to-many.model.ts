export interface Tag{
id:number;
name: string;
created_at:string;
updated_at: string | null;
Restaurants: []
}

export interface RestaurantTag{
    name: string;
    RestaurantTag: {[key:string]:string | null}
}

export interface Rows{
    id: number;
    name: string;
    restaurants: string;
}