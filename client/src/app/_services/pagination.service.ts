import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  paginatedResult = signal<PaginatedResult<any[]> | null>(null);

  resetPagination(){
    this.paginatedResult.set(null);
  }

  setPaginatedResponse(response: HttpResponse<any[]>){
    this.paginatedResult.set({
      items: response.body as any[],
      pagination: JSON.parse(response.headers.get('Pagination')!),
    })
  }

  setPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();

    if(pageNumber && pageSize){
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return params;
  }
}
