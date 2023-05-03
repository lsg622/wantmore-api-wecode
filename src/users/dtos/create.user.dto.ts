export class CreateUserDto {
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  getName(): string {
    return this._name;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }
}
