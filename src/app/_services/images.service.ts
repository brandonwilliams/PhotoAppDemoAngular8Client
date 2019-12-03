import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable } from 'rxjs';

import { Image } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Image[]> {
      return this.http.get<Image[]>(`${environment.apiUrl}/api/public/images`);
  }

  getOne(id) {
    return this.http.get<Image>(`${environment.apiUrl}/api/public/images/${id}`);
  }
}
