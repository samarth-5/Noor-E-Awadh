export type Product = {
  id: string;
  slug: string;
  name: string;
  nameUrdu?: string;
  category: Category;
  price: number;
  mrp: number;
  fabric: string;
  embroidery: string;
  description: string;
  craftStory: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sku: string;
  bestseller?: boolean;
  nawabiEdit?: boolean;
};

export type Category =
  | "Chikankari Kurtas"
  | "Chikankari Suits"
  | "Chikankari Kurtis"
  | "Chikankari Sarees"
  | "Chikankari Lehengas"
  | "Chikankari Dupattas";

export const CATEGORIES: { name: Category; tagline: string; urdu: string }[] = [
  { name: "Chikankari Kurtas", tagline: "Whitework that whispers Awadh", urdu: "کرتا" },
  { name: "Chikankari Suits", tagline: "Three-piece Nawabi grace", urdu: "سوٹ" },
  { name: "Chikankari Kurtis", tagline: "Everyday elegance, handcrafted", urdu: "کرتی" },
  { name: "Chikankari Sarees", tagline: "Drape woven with heritage", urdu: "ساڑی" },
  { name: "Chikankari Lehengas", tagline: "Festive Nawabi finery", urdu: "لہنگا" },
  { name: "Chikankari Dupattas", tagline: "A veil of poetry", urdu: "دوپٹہ" },
];

export const REVIEWS = [
  { name: "Aisha R.", text: "The chikankari is unbelievably fine — you can feel the hours of handwork. Felt like wearing a piece of Lucknow.", rating: 5 },
  { name: "Vikram S.", text: "Ordered for my sister's wedding. The fabric, the finishing, the packaging — every detail screamed luxury.", rating: 5 },
  { name: "Fatima K.", text: "Nazakat se buna hua, exactly as promised. The thread work is delicate and the fit is perfect.", rating: 5 },
  { name: "Rohan M.", text: "Premium quality. Shipping was fast and the heritage card inside was a beautiful touch.", rating: 4 },
  { name: "Sneha P.", text: "I have never received so many compliments on an outfit. This is true Awadhi craftsmanship.", rating: 5 },
];
