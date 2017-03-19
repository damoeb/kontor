export class Post {
  name: String;
  createdAt: Date;
  url: String;
  rating: Number;
  description: String;

  constructor(name: string, createdAt: Date) {
    this.name = name;
    this.createdAt = createdAt;
  }
}
