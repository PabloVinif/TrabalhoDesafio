export class User {
    id: number;
    username: string;
    weight: number;
    password: string;
    email: string;
  
    constructor(id: number, username: string, weight: number, password: string, email: string) {
      this.id = id;
      this.username = username;
      this.weight = weight;
      this.password = password;
      this.email = email;
    }
  }