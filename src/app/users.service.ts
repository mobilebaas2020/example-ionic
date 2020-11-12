import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL = 'https://mobilebaas.com/backend/api/manage/db';

  private headers = {
    'Content-Type': 'application/json',
    'MOBILEBAASKEY': 'MTYwNTIxNDU2MjQ5OUZyYW5ja'
  };

  constructor(private http: HTTP) {}

  insert(user: any,tableName:string) {
    this.http.setDataSerializer("json");
    return this.http.post(this.API_URL+'?table='+tableName,user,this.headers);
  }

  update(user: any,tableName:string) {
    this.http.setDataSerializer("json");
    return this.http.put(this.API_URL+'?table='+tableName,user,this.headers);
  }

  delete(id: string,tableName:string) {
    this.http.setDataSerializer("json");
    return this.http.delete(this.API_URL+'/'+id+'?table='+tableName,{},this.headers);
  }

  getById(id: string,tableName:string) {
    this.http.setDataSerializer("json");
    return this.http.get(this.API_URL+'/'+id+'?table='+tableName,{},this.headers);
  }


  getAll(tableName:string,pageNumber: number,totalRecordsPerPage: number, sortField:string,filters:string) {
    let parameters = '?table='+tableName;
    if(pageNumber != null){
        parameters += '&pageNumer='+pageNumber;
    }
    if(totalRecordsPerPage != null){
        parameters += '&totalRecordsPerPage='+totalRecordsPerPage;
    }
    if(sortField != null){
        parameters += '&sortField='+sortField;
    }
    if(filters != null){
      parameters+= '&filters='+filters;
    }
    return this.http.get(this.API_URL+'/find'+parameters,{},this.headers);
  }
}