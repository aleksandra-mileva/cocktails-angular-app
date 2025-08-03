import {AuthoritiesEnum} from './enums/authorities-enum';

export interface UserLoginResponse {
  id: number;
  username: string;
  token: string;
  authorities: AuthoritiesEnum[];
}
