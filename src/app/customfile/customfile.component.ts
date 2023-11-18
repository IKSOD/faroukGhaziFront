import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CustomfileService } from './service/customfile.service';
import { Component } from '@angular/core';
import { CustomFile } from './customfile.model';
@Component({
  selector: 'app-customfile',
  templateUrl: './customfile.component.html',
  styleUrls: ['./customfile.component.css']
})
export class CustomfileComponent {
  ghazi :any;
  currentSelectedFile : any;
  pictureUrl: any;
 uploadedFiles: any[] = [];

  constructor(private customFileService :  CustomfileService,
    private sanitizer : DomSanitizer){
  }

  select(event : any){
    this.currentSelectedFile = event.target.files[0]
  }

  upload() {
    if (this.currentSelectedFile) {
      this.customFileService.uploadCustomFile(this.currentSelectedFile).subscribe({
        next: (response: number) => {
          console.log(response);
          // Assuming you receive information about the uploaded file, update the uploadedFiles array
          // this.uploadedFiles.push({
          //   name: this.currentSelectedFile.name,
          //   size: this.currentSelectedFile.size,
          //   url: this.base64ToSafeUrl(response + ''),
          // });
          // this.currentSelectedFile = null;
        },
        error: (e: any) => console.log(e),
      });
    }
  }

  base64ToSafeUrl(data: string , mimeType: string = 'image/*'): SafeUrl | null {
    try {
      const uint8Array = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
      const blob = new Blob([uint8Array], { type: mimeType });

      // Create a safe URL
      return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error converting data to URL:', error);
      return null;
    }
  }

  getFile(){
    let res : CustomFile;
    this.customFileService.getCustomFileById(this.ghazi).subscribe({
      next : (response : CustomFile) => {
        console.log(response)
        res = response
      },
      error : (e : any) => console.log(e),
      complete : () => this.pictureUrl = this.base64ToSafeUrl(res.file+"")
    })

  }

}
