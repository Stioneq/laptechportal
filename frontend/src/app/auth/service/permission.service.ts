import {Injectable} from '@angular/core';

@Injectable()
export class PermissionService {
  private rolesPerUrl = [
    {url: 'interview', roles: ['ADMIN']}
  ];

  /**
   * Returns list of roles that have enough permissions to load module
   * @param {string} url
   * @returns {Array}
   */
  getAcceptableRoles(url: string) {
    const entries = this.rolesPerUrl.filter(entry => entry.url === url);
    if (entries.length === 1) {
      return entries[0].roles;
    } else {
      throw new Error('No available records for given url' + url);
    }
  }
}
