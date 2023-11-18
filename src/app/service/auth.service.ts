import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { usermodel } from '../model/usermodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {

  }
  apiurl='http://localhost:3000/user';
  apiurlSpring='http://localhost:8081/pfe/user';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetUser(user:usermodel):Observable<usermodel>{
    return this.http.post(this.apiurlSpring+"/getUser",user).pipe(map(obs=>{
      const user =  obs as usermodel;
      user.cin= null
      return user;
    }
      ))
  }

  
  GetUserbyCode(id:any){
    return this.http.get<any[]>(`${this.apiurl}?name=${id}`);
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }
  // In AuthService
storeUploadedFileUrl(fileUrl: string) {
  // Replace 'http://localhost:3000/uploadedFiles' with the appropriate URL for your json-server endpoint
  return this.http.post('http://localhost:3000/uploadedFiles', { url: fileUrl });
}

}
