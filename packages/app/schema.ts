// import Realm from 'realm';

// class extends Realm.Object

export type ActivityItem = {
  id?: string;
  user?: User;
  from_user?: User;
  content?: Content;
  url?: string;
  style?: string;
  template?: string;
  priority?: number;
  time_to_live?: Date;
  created_at?: Date;
  updated_at?: Date;
};

export class ActivityItemSchema {
  id?: string;
  user?: User;
  from_user?: User;
  content?: Content;
  url?: string;
  style?: string;
  template?: string;
  priority?: number;
  time_to_live?: Date;
  created_at?: Date;
  updated_at?: Date;

  static schema = {
    name: 'ActivityItem',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      user: 'User',
      from_user: 'User',
      content: 'Content',
      url: 'string?',
      style: 'string?',
      template: 'string?',
      priority: 'int?',
      time_to_live: 'date?',
      created_at: 'date?',
      updated_at: 'date?'
    }
  };
}

export type AppleDeviceToken = {
  id?: string;
  build_number?: string;
  bundle_version?: string;
  bundle_id?: string;
  created_at?: Date;
  updated_at?: Date;
  is_production?: boolean;
  is_voip?: boolean;
  is_invalidated?: boolean;
};

export class AppleDeviceTokenSchema {
  id?: string;
  build_number?: string;
  bundle_version?: string;
  bundle_id?: string;
  created_at?: Date;
  updated_at?: Date;
  is_production?: boolean;
  is_voip?: boolean;
  is_invalidated?: boolean;

  static schema = {
    name: 'AppleDeviceToken',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      build_number: 'string?',
      bundle_version: 'string?',
      bundle_id: 'string?',
      created_at: 'date?',
      updated_at: 'date?',
      is_production: 'bool?',
      is_voip: 'bool?',
      is_invalidated: 'bool?'
    }
  };
}

export type Config = {
  id?: string;
  is_app_update_required?: boolean;
  app_share_url?: string;
  multi_invite_text?: string;
  single_invite_text?: string;
  invite_text_body?: string;
  profile_verification_alert?: string;
  invite_share_view_description?: string;
  minimum_posts_hide_invite_share?: number;
  minimum_posted_hide_invite_share?: number;
  minimum_feed_hide_invite_share?: number;
  snap_username?: string;
  ig_username?: string;
  twitter_username?: string;
  default_reaction_emojis: Array<string>;
  delete_account_available?: boolean;
  onboarding_invite_user_filter?: boolean;
  in_app_post_message?: string;
};

export class ConfigSchema {
  id?: string;
  is_app_update_required?: boolean;
  app_share_url?: string;
  multi_invite_text?: string;
  single_invite_text?: string;
  invite_text_body?: string;
  profile_verification_alert?: string;
  invite_share_view_description?: string;
  minimum_posts_hide_invite_share?: number;
  minimum_posted_hide_invite_share?: number;
  minimum_feed_hide_invite_share?: number;
  snap_username?: string;
  ig_username?: string;
  twitter_username?: string;
  default_reaction_emojis: Array<string>;
  delete_account_available?: boolean;
  onboarding_invite_user_filter?: boolean;
  in_app_post_message?: string;

  static schema = {
    name: 'Config',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      is_app_update_required: 'bool?',
      app_share_url: 'string?',
      multi_invite_text: 'string?',
      single_invite_text: 'string?',
      invite_text_body: 'string?',
      profile_verification_alert: 'string?',
      invite_share_view_description: 'string?',
      minimum_posts_hide_invite_share: 'int?',
      minimum_posted_hide_invite_share: 'int?',
      minimum_feed_hide_invite_share: 'int?',
      snap_username: 'string?',
      ig_username: 'string?',
      twitter_username: 'string?',
      default_reaction_emojis: 'string[]',
      delete_account_available: 'bool?',
      onboarding_invite_user_filter: 'bool?',
      in_app_post_message: 'string?'
    }
  };
}

export type Contact = {
  id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  clean_name?: string;
  phone_numbers: Array<string>;
  is_emoji?: boolean;
  is_profile_photo?: boolean;
  is_invited?: boolean;
  is_hidden?: boolean;
  score?: number;
  friends_count?: number;
  is_invite_declined?: boolean;
  is_upload_needed?: boolean;
  user?: User;
  contact_user?: User;
  created_at?: Date;
  updated_at?: Date;
};

export class ContactSchema {
  id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  clean_name?: string;
  phone_numbers: Array<string>;
  is_emoji?: boolean;
  is_profile_photo?: boolean;
  is_invited?: boolean;
  is_hidden?: boolean;
  score?: number;
  friends_count?: number;
  is_invite_declined?: boolean;
  is_upload_needed?: boolean;
  user?: User;
  contact_user?: User;
  created_at?: Date;
  updated_at?: Date;

  static schema = {
    name: 'Contact',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      first_name: 'string?',
      last_name: 'string?',
      full_name: 'string?',
      clean_name: 'string?',
      phone_numbers: 'string[]',
      is_emoji: 'bool?',
      is_profile_photo: 'bool?',
      is_invited: 'bool?',
      is_hidden: 'bool?',
      score: 'int?',
      friends_count: 'int?',
      is_invite_declined: 'bool?',
      is_upload_needed: 'bool?',
      user: 'User',
      contact_user: 'User',
      created_at: 'date?',
      updated_at: 'date?'
    }
  };
}

export type Content = {
  id?: string;
  user?: User;
  tagged_users: Array<User>;
  tagged_contacts: Array<Contact>;
  pending_tagged_users: Array<User>;
  local_media_paths: Array<string>;
  remote_media_urls: Array<string>;
  remote_media_upload_urls: Array<string>;
  suggested_reactions: Array<string>;
  visibility?: string;
  reaction_counts: Array<string>;
  views_count?: number;
  is_camera_roll?: boolean;
  feed_item_id?: string;
  uploaded_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  is_shared?: boolean;
  is_client_SMS_sent?: boolean;
  upload_progress?: number;
  last_reacted_at?: Date;
  reactions: Array<string>;
};

export class ContentSchema {
  id?: string;
  user?: User;
  tagged_users: Array<User>;
  tagged_contacts: Array<Contact>;
  pending_tagged_users: Array<User>;
  local_media_paths: Array<string>;
  remote_media_urls: Array<string>;
  remote_media_upload_urls: Array<string>;
  suggested_reactions: Array<string>;
  visibility?: string;
  reaction_counts: Array<string>;
  views_count?: number;
  is_camera_roll?: boolean;
  feed_item_id?: string;
  uploaded_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  is_shared?: boolean;
  is_client_SMS_sent?: boolean;
  upload_progress?: number;
  last_reacted_at?: Date;
  reactions: Array<string>;

  static schema = {
    name: 'Content',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      user: 'User',
      tagged_users: 'User[]',
      tagged_contacts: 'Contact[]',
      pending_tagged_users: 'User[]',
      local_media_paths: 'string[]',
      remote_media_urls: 'string[]',
      remote_media_upload_urls: 'string[]',
      suggested_reactions: 'string[]',
      visibility: 'string?',
      reaction_counts: 'string[]',
      views_count: 'int?',
      is_camera_roll: 'bool?',
      feed_item_id: 'string?',
      uploaded_at: { type: 'date?', indexed: true },
      created_at: 'date?',
      updated_at: 'date?',
      is_shared: 'bool?',
      is_client_SMS_sent: 'bool?',
      upload_progress: 'float?',
      last_reacted_at: 'date?',
      reactions: 'string[]'
    }
  };
}

export type Report = {
  id?: string;
  user?: User;
  content?: Content;
};

export class ReportSchema {
  id?: string;
  user?: User;
  content?: Content;

  static schema = {
    name: 'Report',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      user: 'User',
      content: 'Content'
    }
  };
}

export type SearchHistory = {
  id?: string;
  user?: User;
  contact?: Contact;
  updated_at?: Date;
};

export class SearchHistorySchema {
  id?: string;
  user?: User;
  contact?: Contact;
  updated_at?: Date;

  static schema = {
    name: 'SearchHistory',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      user: 'User',
      contact: 'Contact',
      updated_at: 'date?'
    }
  };
}

export type Session = {
  id?: string;
  user?: User;
  phone_number?: string;
  verification_code?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class SessionSchema {
  id?: string;
  user?: User;
  phone_number?: string;
  verification_code?: string;
  created_at?: Date;
  updated_at?: Date;

  static schema = {
    name: 'Session',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      user: 'User',
      phone_number: 'string?',
      verification_code: 'string?',
      created_at: 'date?',
      updated_at: 'date?'
    }
  };
}

export type User = {
  id?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  ban_reason_text?: string;
  profile_photo_url?: string;
  profile_photo_upload_url?: string;
  is_ghost?: boolean;
  username?: string;
  time_zone?: string;
  default_create_content_permission?: string;
  create_content_permission?: string;
  invalidated_fields: Array<string>;
  badges: Array<string>;
  invites_sent?: number;
  badge_count?: number;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  posted_count?: number;
  reactions_count?: number;
  views_count?: number;
  latitude?: number;
  longitude?: number;
  is_following?: boolean;
  is_followed_by?: boolean;
  is_blocking?: boolean;
  is_blocked_by?: boolean;
  top_poparazzi: Array<User>;
  mutual_users: Array<User>;
  is_online?: boolean;
  age?: number;
  created_at?: Date;
  updated_at?: Date;
};

export class UserSchema {
  id?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  ban_reason_text?: string;
  profile_photo_url?: string;
  profile_photo_upload_url?: string;
  is_ghost?: boolean;
  username?: string;
  time_zone?: string;
  default_create_content_permission?: string;
  create_content_permission?: string;
  invalidated_fields: Array<string>;
  badges: Array<string>;
  invites_sent?: number;
  badge_count?: number;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  posted_count?: number;
  reactions_count?: number;
  views_count?: number;
  latitude?: number;
  longitude?: number;
  is_following?: boolean;
  is_followed_by?: boolean;
  is_blocking?: boolean;
  is_blocked_by?: boolean;
  top_poparazzi: Array<User>;
  mutual_users: Array<User>;
  is_online?: boolean;
  age?: number;
  created_at?: Date;
  updated_at?: Date;

  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      phone_number: 'string?',
      first_name: 'string?',
      last_name: 'string?',
      ban_reason_text: 'string?',
      profile_photo_url: 'string?',
      profile_photo_upload_url: 'string?',
      is_ghost: 'bool?',
      username: 'string?',
      time_zone: 'string?',
      default_create_content_permission: 'string?',
      create_content_permission: 'string?',
      invalidated_fields: 'string[]',
      badges: 'string[]',
      invites_sent: 'int?',
      badge_count: 'int?',
      followers_count: 'int?',
      following_count: 'int?',
      posts_count: 'int?',
      posted_count: 'int?',
      reactions_count: 'int?',
      views_count: 'int?',
      latitude: 'int?',
      longitude: 'int?',
      is_following: 'bool?',
      is_followed_by: 'bool?',
      is_blocking: 'bool?',
      is_blocked_by: 'bool?',
      top_poparazzi: 'User[]',
      mutual_users: 'User[]',
      is_online: 'bool?',
      age: 'int?',
      created_at: 'date?',
      updated_at: 'date?'
    }
  };
}

export const Schema = [
  ActivityItemSchema,
  AppleDeviceTokenSchema,
  ConfigSchema,
  ContactSchema,
  ContentSchema,
  ReportSchema,
  SearchHistorySchema,
  SessionSchema,
  UserSchema
];
