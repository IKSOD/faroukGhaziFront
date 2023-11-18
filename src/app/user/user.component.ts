import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import {CustomfileService} from "../customfile/service/customfile.service";
import {CustomFile} from "../customfile/customfile.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  receivedLetter: any[] = [];
  myForm!: FormGroup;
  showForm = false;
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];
  private fileB64?: string;
  private fileType?: null | string;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private dialog: MatDialog,
    private customFileService: CustomfileService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.LoadUser();
    this.initForm();
    this.receivedLetter = await this.getCustomFiles();
    this.getNewOrder();
  }

  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getCustomFiles(): Promise<CustomFile[]> {
    return new Promise<CustomFile[]>(resolve => {
      this.customFileService.getCustomFile().subscribe({
        next: (result) => {

          resolve(result)
        }
      })
    })
  }
  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

  initForm(){
    this.myForm = this.fb.group({
      order: ['', Validators.required],
      date: ['', Validators.required],
      letterNumber: ['', Validators.required],
      file: ['', Validators.required],
    })
  }

  protected selectFile(event: any): void {
    const selectedFile = event.target.files[0] as File;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileB64 = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  getNewOrder(): void {
    this.myForm.patchValue({
      order: this.receivedLetter.length === 0 ? 1 : this.receivedLetter[this.receivedLetter.length-1].order + 1,
    });
  }

  public onSubmit(){
    if (this.myForm.valid){
      const customFile = {...this.myForm.value}
      customFile.file = this.fileB64;
      this.customFileService.uploadCustomFile(customFile).subscribe({
        next: (response) => {
          this.getCustomFiles().then(res => {
            this.receivedLetter = res;
            this.myForm.reset();
            this.getNewOrder();
          });
        }
      })
    }
  }

  deleteFile(id:any) {
    this.customFileService.deleteCustomFile(id).subscribe({
      next:(res) => {
        this.getCustomFiles().then(res => {
          this.receivedLetter = res;
          this.getNewOrder();
        });
      }
    })
  }

  downloadFile(dataUrl: string, order: number) {
      const fileName = `file-${order}-${Date.now()}.pdf`;
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      a.click();
  }

}
