export interface Attendant {
  id: string;
  name: string;
  photo: string | null;
  principal: boolean;
  status: boolean;
  pinned: boolean;
  pinned_at: string | null;
}

export interface Instance {
  id: string;
  name: string;
  telephone: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface MessageContent {
  text?: string;
}

export interface Contact {
  name: string;
  telephone?: string;
  whatsapp_id?: string;
}

export interface QuotedMessage {
  id: string;
  content: MessageContent;
  from_me: boolean;
  sent_by: string | null;
}

export interface Message {
  id: string;
  type: string;
  content: MessageContent;
  from_me: boolean;
  quoted: QuotedMessage | null;
}

export interface Chat {
  id: string;
  contact: Contact;
  instance: Instance;
  department: Department | null;
  attendant: Attendant[] | null;
}

export interface Infos {
  chat: Chat;
  message: Message;
}

export interface NewChatMessageEvent {
  infos: Infos;
}