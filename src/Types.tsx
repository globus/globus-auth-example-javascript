
export interface Identity {
  sub: string;
  organization: string;
  name: string;
  preferred_username: string;
  identity_provider: string;
  identity_provider_display_name: string;
  email: string;
  last_authentication: number;
  identity_set: Identity[];
}