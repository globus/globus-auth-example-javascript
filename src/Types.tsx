
export interface IUserInfo {
  email: string;
  id: string;
  identity_provider: string;
  identity_type: string;
  name: string;
  organization: string;
  status: string;
  username: string;
}

export interface IIdentityProvider {
  alternative_names: string[];
  domains: string[];
  id: string;
  name: string;
  short_name: string;
}

export interface IIdentityProviders {
  identity_providers: IIdentityProvider[];
}

export interface IUserInfoResponse {
  identities: IUserInfo[];
  included: IIdentityProviders;
}
