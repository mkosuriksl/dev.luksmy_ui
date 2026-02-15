import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('startTypewriter', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ width: 0, opacity: 0 }),
        animate('2s ease-in')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  userId = "";
  location = "";
  choosenLocation = "";
  serviceType: any;
  spServices: any[]=[]
  isBool=false;
  isFormValid = false;
  submitForm!:FormGroup;
  serviceCategories!: string[];
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedMode:any="centre"
  searchResult : boolean = false;

  serviceSubCategories: any;
  assetCats: any;
  assetSubCats: any;
  assetModels: any;
  assetBrands: any;
  constructor(private apiService: ApiserviceService,
              private toast: ToastService,
              private authService: AuthService,
              private router: Router
              ){}

              ngOnInit() {
                this.getServiceCategories();
                 this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
                 this.isLoggedIn = isLoggedIn;
                 });
                 this.submitForm = new FormGroup({
                  assetSubCat1 :new FormControl('', Validators.required),
                  assetSubCat: new FormControl('', Validators.required),
                  Location: new FormControl(''),
                  mode:new FormControl("center")
                });
                 this.submitForm.statusChanges.subscribe(status => {
                  this.isFormValid = status === 'VALID';
                });
                this.onDropDownChange()
              }

              onDropDownChange(){
                const params:any={};
                  params.assetCat=localStorage.getItem('serviceCategory');
                this.apiService.getAcategory1(params).subscribe((res:any)=>{
                  if(res.status){
                    const data = res.data;
                    this.assetCats = [...new Set(data.map((item:any) => item.assetCat))];
                  this.assetSubCats = [...new Set(data.map((item:any) => item.assetSubCat))];
                  this.assetModels = [...new Set(data.map((item:any) => item.assetModel))];
                  this.assetBrands = [...new Set(data.map((item:any) => item.assetBrand))];
                  // this.assetId = [...new Set(data.map((item:any) => item.assetId))];
                  }
                }
               
                );
              }
            
              onSubmitRequestForm() {
                if(this.selectedMode=='rental'){
this.getRentals()
                }else{

                
                const ans: any = this.submitForm.value?.assetSubCat;
                const params: any = {};
                if (this.submitForm.value?.assetSubCat) {
                   params.serviceTypes = this.submitForm.value?.assetSubCat;
                }
                if (this.submitForm.value?.Location) {
                    // params.Location = encodeURIComponent(this.choosenLocation)
                    params.location =  this.choosenLocation.replace(/\s+/g, '');
                   //  params.Location = "hyderabad"
                }
                this.apiService.getSpDetails(params).subscribe((response) => {
                    if (response.userData.length <= 0) {
                        this.isBool = false;
                        this.toast.show("No result found for given Service Type and Location",3000)
                    } else {
                        const userDataDict = response.userData.reduce((acc: { [x: string]: any; }, user: { bodSeqNo: string | number; }) => {
                            acc[user.bodSeqNo] = user;
                            return acc;
                        }, {});
            
                        const userServicesDict = response.userServicesData.reduce((acc: { [x: string]: any; }, service: { userId: string | number; }) => {
                            acc[service.userId] = service;
                            return acc;
                        }, {});
            
                       const userServiceInDetailDict = response.userServiceInDetail.reduce((acc: any, detail: any) => {
                            acc[detail.bodSeqNo] = detail;
                            return acc;
                        }, {});
            
                        // Create a map for service IDs to service names
                        const serviceIdToNameMap = response.serviceNames.reduce((acc: { [x: string]: any; }, service: { serviceId: string; serviceName: string; }) => {
                            acc[service.serviceId] = service.serviceName;
                            return acc;
                        }, {});
            
                        // Update userServiceInDetail with service names
                        response.userServiceInDetail.forEach((detail:any) => {
                            if (detail.serviceIdList) {
                                detail.serviceNameList = detail.serviceIdList.map((serviceId:any) => serviceIdToNameMap[serviceId] || null);
                            }
                        });
            
                        // Prepare the final list of dictionaries with required details
                        const result = Object.keys(userDataDict).map(bodSeqNo => {
                            const user = userDataDict[bodSeqNo];
                            const userService = userServicesDict[bodSeqNo];
                            const userServiceDetail = userServiceInDetailDict[bodSeqNo];
            
                            return {
                                name: user?.name,
                                mobile: user?.mobile,
                                email: user?.email,
                                city: user?.city,
                                location: userService?.location,
                                verified: user?.verified,
                                address: userService?.city,
                                qualification: userService?.qualification,
                                experience: userService?.experience,
                                charge: userService?.charge,
                                serviceSubCategory: userService?.serviceType,
                                serviceNames: [...new Set(userServiceDetail?.serviceNameList?.filter((name:any) => name != null))] /// Add the service names here
                            };
                        });
            
                        this.spServices = result;
                        this.searchResult = true;
                        this.isBool = true;

                        setTimeout(() => {
                          this.searchResult = false;
                        }, 3000);
                    }
                });
              }
          }

          getRentals(){
            
              let params:any={};
              params.userId=localStorage.getItem('USER_ID');
              if (this.submitForm.value?.assetSubCat1) {
                params.assetCat =this.submitForm.value?.assetSubCat1;
              }
              if (this.submitForm.value?.assetSubCat) {
                params.assetSubCat =this.submitForm.value?.assetSubCat;
              }
              if (this.submitForm.value?.location) {
                params.availableLocation =this.choosenLocation.replace(/\s+/g, '');
              }
              // if (this.submitForm.value?.assetBrand) {
              //   params.assetBrand =this.submitForm.value?.assetBrand;
              // }
              // if (this.submitForm.value?.assetModel) {
              //   params.assetModel =this.submitForm.value?.assetModel;
              // }
              this.apiService.getHomeRental(params).subscribe(
                (response) => {
                  if (response.rentalData.length <= 0) {
                    this.isBool = false;
                    this.toast.show("No result found for given Service Type and Location",3000)
                } 
                  this.spServices = response.rentalData;
                  this.isBool=true;
                },
                (error) => {
                  this.isBool=false;
                  console.error('Error fetching asset category data:', error);
                }
              );
            }
          
            
              options: any = {
                componentRestrictions: { country: 'IN' },
              };
              public handleAddressChange(place: google.maps.places.PlaceResult) {
                console.log(place.formatted_address);
                this.choosenLocation = place.formatted_address ?? '';
              }
            
              getServiceCategories() {
                let categories = new Set<string>();
                this.apiService.getServiceType().subscribe((res: any) => {
                  this.serviceType = res.data;
                  this.serviceType.forEach((service:any) => {
                    categories.add(service.serviceCategory);
                    this.serviceCategories = Array.from(categories);
                  });
                });  
              
              }
              
              onCategoryChange() {
                this.serviceSubCategories = this.serviceType
                  .filter((service:any) => service.serviceCategory === this.selectedCategory)
                  .map((service:any) => service.serviceSubCategory);
                this.selectedSubCategory = ''; // Reset subcategory selection
              }

              changeMode(val:any){
                this.submitForm.controls['assetSubCat'].setValue('')
                this.submitForm.controls['assetSubCat1'].setValue('')
         
                this.selectedMode=val.target.value;

              }


}
