export interface Cacheable {
  ttl?: number;
  createdAt: Date;
}

export interface UserIcon extends Cacheable {
  icon: any;
}
