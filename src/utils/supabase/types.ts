type UserMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  preferred_username: string;
  provider_id: string;
  sub: string;
  user_name: string;
};

type Identity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: object;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

type AppMetadata = {
  provider: string;
  providers: string[];
};

export type User = {
  id: string;
  aud: string;
  role?: string | undefined;
  email?: string | undefined;
  email_confirmed_at?: string | undefined;
  phone?: string | undefined;
  confirmed_at?: string | undefined;
  last_sign_in_at?: string | undefined;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};
