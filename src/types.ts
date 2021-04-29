import {PermissionKeys} from './authorization/permission-keys';


export interface RequiredPermissions {
  required: PermissionKeys[];
}


// ----29-04-2021
// security id itu bug fix dari id untuk lb4 new version
export interface MyUserProfile {
  id: string;
  email?: string;
  name: string;
  permissions: PermissionKeys[];
  securityId: string;
}
  // ----29-04-2021
