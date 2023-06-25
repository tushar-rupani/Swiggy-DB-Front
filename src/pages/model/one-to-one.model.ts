export interface OneToOneRowData{
    id: number;
    username: string;
    price: number;
    payment_status: string;
    created_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    price: number;
    status: string;
    created_at: string;
    updated_at: string | null;
    Payment: {
      status: string;
    };
    User: {
      username: string;
    };
  }
  