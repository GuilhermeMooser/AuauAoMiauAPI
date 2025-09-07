import { Role } from "@/roles/domain/role.entity";

type PermissionProps = {
  id?: string;
  name: string;
  displayName: string;
  description: string;
  resource: string;
  action: string;
  active: boolean;
  createdAt: Date;
  roles: Role[];
}

export class Permission {
  readonly id?: string;
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly resource: string;
  readonly action: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly roles: Role[];

  constructor(props: PermissionProps) {
  this.id = props.id;
  this.name = props.name;
  this.displayName = props.displayName;
  this.description = props.description;
  this.resource = props.resource;
  this.action = props.action;
  this.active = props.active;
  this.createdAt = props.createdAt;
  this.roles = props.roles;
  }
}
