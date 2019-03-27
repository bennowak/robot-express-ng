export class Robot {
  constructor(
    public id: number,
    public name: string,
    public type: string,
  ) {}

  public toJSON = function() {
    const jsonString = `{ "id": ${this.id}, "name": "${this.name}", "type": "${this.type}" }`;
    console.log(jsonString);
    return jsonString;
  };
}
