import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {getApiUrl, getAuthUrl, getServerUrl} from '../../util/url.util';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {
  }


  uploadUserIcon(icon: any) {

    const formData = new FormData();
    formData.append('file', icon, 'image.png');
    return this.http.post(getServerUrl('files', 'images', 'upload', 'usericon'), formData)
      .pipe(map(() => true));
  }
}
