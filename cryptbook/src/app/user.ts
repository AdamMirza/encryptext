export class User {
  id: number;
  username: string;
  name: string;
  email: string;
  public_list: string[];
  private_key: string;
  contacts: User[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
