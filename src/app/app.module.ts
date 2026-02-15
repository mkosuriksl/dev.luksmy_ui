import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgOptimizedImage } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { DashboardPannelComponent } from './components/dashboard-pannel/dashboard-pannel.component';
import { ServiceRequestPageComponent } from './components/service-request-page/service-request-page.component';
import { ServicePersonPageComponent } from './components/service-person-page/service-person-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { Loader } from '@googlemaps/js-api-loader';
import { VerfiyOtpComponent } from './components/verfiy-otp/verfiy-otp.component';
import { EcDashboardComponent } from './components/ec-dashboard/ec-dashboard.component';
import { EcDashboardPannelComponent } from './components/ec-dashboard-pannel/ec-dashboard-pannel.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { EcServiceRequestComponent } from './ec-service-request/ec-service-request.component';
import { AddAssetsComponent } from './components/add-assets/add-assets.component';
import { EditAssetsComponent } from './components/edit-assets/edit-assets.component';
import { EditAssetsPageComponent } from './components/edit-assets-page/edit-assets-page.component';
import { AddAssetsCategoriesComponent } from './components/add-assets-categories/add-assets-categories.component';
import { ShowAssetsCategoriesComponent } from './components/show-assets-categories/show-assets-categories.component';
import { EditAssetsCategoriesComponent } from './components/edit-assets-categories/edit-assets-categories.component';
import { AddServiceCategoryComponent } from './components/add-service-category/add-service-category.component';
import { ShowServiceCategoryComponent } from './components/show-service-category/show-service-category.component';
import { EditServiceCategoryComponent } from './components/edit-service-category/edit-service-category.component';
import { SearchPersonDetailsComponent } from './components/search-person-details/search-person-details.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerReportsComponent } from './components/customer-reports/customer-reports.component';
import { SpDashboardComponent } from './components/sp-dashboard/sp-dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { SpRegistrationComponent } from './components/sp-registration/sp-registration.component';
import { SpVerifyOtpComponent } from './components/sp-verify-otp/sp-verify-otp.component';
import { SpLoginComponent } from './components/sp-login/sp-login.component';
import { SpProfileComponent } from './components/sp-profile/sp-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { Home1Component } from './home1/home1.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SpAddServiceComponent } from './components/sp-add-service/sp-add-service.component';
import { SpUpdateServiceComponent } from './components/sp-update-service/sp-update-service.component';
import { SpResetPasswordComponent } from './components/sp-reset-password/sp-reset-password.component';
import { SpUpdateAvailabilityComponent } from './components/sp-update-availability/sp-update-availability.component';
import { AdminServiceNameComponent } from './components/admin-service-name/admin-service-name.component';
import { AdminUpdateServiceNameComponent } from './components/admin-update-service-name/admin-update-service-name.component';
import { ShowServiceNameComponent } from './components/show-service-name/show-service-name.component';
import { EditServiceNameComponent } from './components/edit-service-name/edit-service-name.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpServiceRequestComponent } from './components/sp-service-request/sp-service-request.component';
import { SpShowmyServicesComponent } from './components/sp-showmy-services/sp-showmy-services.component';
import { EcProfileComponent } from './components/ec-profile/ec-profile.component';
import { SpUpdateProfileComponent } from './components/sp-update-profile/sp-update-profile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AgGridModule } from 'ag-grid-angular';
import { AssetsCategoryReportComponent } from './components/assets-category-report/assets-category-report.component';
import { EditAssetDataComponent } from './components/edit-asset-data/edit-asset-data.component';
import { SpForgotPasswordComponent } from './components/sp-forgot-password/sp-forgot-password.component';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { AddServiceChargesComponent } from './add-service-charges/add-service-charges.component';
import { ShowServiceChargesComponent } from './show-service-charges/show-service-charges.component';
import { AddRentalComponent } from './add-rental/add-rental.component';
import { ShowRentalComponent } from './show-rental/show-rental.component';
import { EditRentalComponent } from './edit-rental/edit-rental.component';
import { UpdateServiceChargeComponent } from './update-service-charge/update-service-charge.component';
import { AddSpRentalComponent } from './add-sp-rental/add-sp-rental.component';
import { ShowSpRentalComponent } from './show-sp-rental/show-sp-rental.component';
import { UpdateSpRentalComponent } from './update-sp-rental/update-sp-rental.component';
import { TncComponent } from './components/tnc/tnc.component';
import { ServiceDetailsModalComponent } from './service-details-modal/service-details-modal.component';
import { AdminShowChargeComponent } from './components/admin-show-charge/admin-show-charge.component';
import { ApiUrlComponent } from './components/api-url/api-url.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { SpSupplierComponent } from './components/sp-supplier/sp-supplier.component';
import { MsDashboardComponent } from './ms-dashboard/ms-dashboard.component';
import { MsLoginComponent } from './components/ms-login/ms-login.component';
import { MsVerifyOtpComponent } from './components/ms-verify-otp/ms-verify-otp.component';
import { MsForgotPasswordComponent } from './components/ms-forgot-password/ms-forgot-password.component';
import { MsprofileComponent } from './components/msprofile/msprofile.component';
import { MsstockmasterComponent } from './components/msstockmaster/msstockmaster.component';
import { MsstockpriceComponent } from './components/msstockprice/msstockprice.component';
import { MsstockreportComponent } from './components/msstockreport/msstockreport.component';
import { MsshowmasterComponent } from './components/msshowmaster/msshowmaster.component';
import { MsupdatemasterComponent } from './components/msupdatemaster/msupdatemaster.component';
import { MsUpdateProfileComponent } from './ms-update-profile/ms-update-profile.component';
import { AdminStockMasterComponent } from './components/admin-stock-master/admin-stock-master.component';
import { AdminShowMasterComponent } from './components/admin-show-master/admin-show-master.component';
import { AdminUpdateMasterComponent } from './components/admin-update-master/admin-update-master.component';
import { MsDashboardRequestComponent } from './ms-dashboard-request/ms-dashboard-request.component';
import { QuotationReportComponent } from './ms-dashboard-request/quotation-report/quotation-report.component';
import { InvoiceReportComponent } from './ms-dashboard-request/invoice-report/invoice-report.component';
import { MsShowMaterialRequestComponent } from './ms-dashboard-request/ms-show-material-request/ms-show-material-request.component';
import { DeliveryReportComponent } from './ms-dashboard-request/delivery-report/delivery-report.component';
import { AddMaterialComponent } from './ms-dashboard-request/material-management/add-material/add-material.component';
import { ShowMaterialListComponent } from './ms-dashboard-request/material-management/show-material-list/show-material-list.component';
import { MaterialDeliveryStatusComponent } from './material-delivery-status/material-delivery-status.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DashboardPannelComponent,
    ServiceRequestPageComponent,
    ServicePersonPageComponent,
    ForgotPasswordComponent,
    VerfiyOtpComponent,
    EcDashboardComponent,
    EcDashboardPannelComponent,
    UpdateProfileComponent,
    EcServiceRequestComponent,
    AddAssetsComponent,
    EditAssetsComponent,
    EditAssetsPageComponent,
    AddAssetsCategoriesComponent,
    ShowAssetsCategoriesComponent,
    EditAssetsCategoriesComponent,
    AddServiceCategoryComponent,
    ShowServiceCategoryComponent,
    EditServiceCategoryComponent,
    SearchPersonDetailsComponent,
    ServiceRequestComponent,
    AdminComponent,
    CustomerReportsComponent,
    SpDashboardComponent,
    SpRegistrationComponent,
    SpVerifyOtpComponent,
    SpLoginComponent,
    SpProfileComponent,
    ResetPasswordComponent,
    Home1Component,
    MyProfileComponent,
    SpAddServiceComponent,
    SpUpdateServiceComponent,
    SpResetPasswordComponent,
    SpUpdateAvailabilityComponent,
    AdminServiceNameComponent,
    AdminUpdateServiceNameComponent,
    ShowServiceNameComponent,
    EditServiceNameComponent,
    SpServiceRequestComponent,
    SpShowmyServicesComponent,
    EcProfileComponent,
    SpUpdateProfileComponent,
    AssetsCategoryReportComponent,
    EditAssetDataComponent,
    SpForgotPasswordComponent,
    AdminResetPasswordComponent,
    AddServiceChargesComponent,
    ShowServiceChargesComponent,
    AddRentalComponent,
    ShowRentalComponent,
    EditRentalComponent,
    UpdateServiceChargeComponent,
    AddSpRentalComponent,
    ShowSpRentalComponent,
    UpdateSpRentalComponent,
    TncComponent,
    ServiceDetailsModalComponent,
    AdminShowChargeComponent,
    ApiUrlComponent,
    PrivacyPolicyComponent,
    DeleteAccountComponent,
    SpSupplierComponent,
    MsDashboardComponent,
    MsLoginComponent,
    MsVerifyOtpComponent,
    MsForgotPasswordComponent,
    MsprofileComponent,
    MsstockmasterComponent,
    MsstockpriceComponent,
    MsstockreportComponent,
    MsshowmasterComponent,
    MsupdatemasterComponent,
    MsUpdateProfileComponent,
    AdminStockMasterComponent,
    AdminShowMasterComponent,
    AdminUpdateMasterComponent,
    MsDashboardRequestComponent,
    QuotationReportComponent,
    InvoiceReportComponent,
    MsShowMaterialRequestComponent,
    DeliveryReportComponent,
    AddMaterialComponent,
    ShowMaterialListComponent,
    MaterialDeliveryStatusComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    NgxPaginationModule,
    NgxGpAutocompleteModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    ScrollingModule,
    AgGridModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: Loader,
      useValue: new Loader({
        apiKey: 'AIzaSyBE49eJ-hTzLNA7IKZ2DOnW-4BBHDzDXlA',
        libraries: ['places']
      })
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
