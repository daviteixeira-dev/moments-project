export interface Moment {
  id?: number,
  title: string,
  image: string,
  description: string,
  created_at?: string,
  updated_at?: string,
  comments?: [{ text: string; username: string }];
}
