export type blogTypes = {
  userId?: string;
  _id?: string;
  title?: string;
  image?: string;
  content?: string | TrustedHTML;
  category?: string;
  slug?: string;
  updatedAt?: string | number | Date;
  createdAt?: string | number | Date;
};
