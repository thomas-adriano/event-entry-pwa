export class Person {
  constructor(
    public socialNumber: string,
    public name: string,
    public branch: string
  ) {}

  public static readonly PERSON_NOT_FOUND = new Person(
    "99999999999",
    "Pessoa Nao Encontrada",
    "Canal/Filial nao encontrada"
  );

  public static isNotFound(person: Person) {
    return person.socialNumber === this.PERSON_NOT_FOUND.socialNumber;
  }
}
