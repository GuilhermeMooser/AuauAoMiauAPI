type UserRoleProps = {
  id: number;
  name: string;
};

export class UserRole {
  id: number;
  name: string;

  constructor(props?: UserRoleProps) {
    this.id = props?.id;
    this.name = props?.name;
  }
}
