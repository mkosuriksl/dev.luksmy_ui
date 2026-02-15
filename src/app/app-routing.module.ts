import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardPannelComponent } from './components/dashboard-pannel/dashboard-pannel.component';
import { ServicePersonPageComponent } from './components/service-person-page/service-person-page.component';
import { ServiceRequestPageComponent } from './components/service-request-page/service-request-page.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
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
import { SpRegistrationComponent } from './components/sp-registration/sp-registration.component';
import { SpVerifyOtpComponent } from './components/sp-verify-otp/sp-verify-otp.component';
import { SpLoginComponent } from './components/sp-login/sp-login.component';
import { SpProfileComponent } from './components/sp-profile/sp-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { Home1Component } from './home1/home1.component';
import { SpAddServiceComponent } from './components/sp-add-service/sp-add-service.component';
import { SpUpdateServiceComponent } from './components/sp-update-service/sp-update-service.component';
import { SpResetPasswordComponent } from './components/sp-reset-password/sp-reset-password.component';
import { SpUpdateAvailabilityComponent } from './components/sp-update-availability/sp-update-availability.component';
import { AdminServiceNameComponent } from './components/admin-service-name/admin-service-name.component';
import { AdminUpdateServiceNameComponent } from './components/admin-update-service-name/admin-update-service-name.component';
import { ShowServiceNameComponent } from './components/show-service-name/show-service-name.component';
import { SpServiceRequestComponent } from './components/sp-service-request/sp-service-request.component';
import { SpShowmyServicesComponent } from './components/sp-showmy-services/sp-showmy-services.component';
import { EcProfileComponent } from './components/ec-profile/ec-profile.component';
import { SpUpdateProfileComponent } from './components/sp-update-profile/sp-update-profile.component';
import { AssetsCategoryReportComponent } from './components/assets-category-report/assets-category-report.component';
import { SpForgotPasswordComponent } from './components/sp-forgot-password/sp-forgot-password.component';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { ShowServiceChargesComponent } from './show-service-charges/show-service-charges.component';
import { AddServiceChargesComponent } from './add-service-charges/add-service-charges.component';
import { ShowRentalComponent } from './show-rental/show-rental.component';
import { UpdateServiceChargeComponent } from './update-service-charge/update-service-charge.component';
import { ShowSpRentalComponent } from './show-sp-rental/show-sp-rental.component';
import { TncComponent } from './components/tnc/tnc.component';
import { AdminShowChargeComponent } from './components/admin-show-charge/admin-show-charge.component';
import { ApiUrlComponent } from './components/api-url/api-url.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { SpSupplierComponent } from './components/sp-supplier/sp-supplier.component';
import { MsLoginComponent } from './components/ms-login/ms-login.component';
import { MsVerifyOtpComponent } from './components/ms-verify-otp/ms-verify-otp.component';
import { MsForgotPasswordComponent } from './components/ms-forgot-password/ms-forgot-password.component';
import { MsstockmasterComponent } from './components/msstockmaster/msstockmaster.component';
import { MsstockpriceComponent } from './components/msstockprice/msstockprice.component';
import { MsstockreportComponent } from './components/msstockreport/msstockreport.component';
import { MsprofileComponent } from './components/msprofile/msprofile.component';
import { MsshowmasterComponent } from './components/msshowmaster/msshowmaster.component';
import { MsupdatemasterComponent } from './components/msupdatemaster/msupdatemaster.component';
import { MsUpdateProfileComponent } from './ms-update-profile/ms-update-profile.component';
import { msAuthGuard } from './guards/ms-auth-guard.guard';
import { spAuthGuard } from './guards/sp-auth-guard.guard';
import { AdminStockMasterComponent } from './components/admin-stock-master/admin-stock-master.component';
import { AdminShowMasterComponent } from './components/admin-show-master/admin-show-master.component';
import { AdminUpdateMasterComponent } from './components/admin-update-master/admin-update-master.component';
import { MsShowMaterialRequestComponent } from './ms-dashboard-request/ms-show-material-request/ms-show-material-request.component';
import { QuotationReportComponent } from './ms-dashboard-request/quotation-report/quotation-report.component';
import { InvoiceReportComponent } from './ms-dashboard-request/invoice-report/invoice-report.component';
import { AddMaterialComponent } from './ms-dashboard-request/material-management/add-material/add-material.component';
import { ShowMaterialListComponent } from './ms-dashboard-request/material-management/show-material-list/show-material-list.component';
import { MaterialDeliveryStatusComponent } from './material-delivery-status/material-delivery-status.component';
import { MsDashboardComponent } from './ms-dashboard/ms-dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'terms-conditions',component:TncComponent},
  {path:'privacy-policy',component:PrivacyPolicyComponent},
  {path: 'ec-forgot-password', component: ForgotPasswordComponent},
  {path: 'admin-forgot-password', component: AdminResetPasswordComponent},
  {path: 'sp-forgot-password', component: SpForgotPasswordComponent},
  {path: 'home',component: HomeComponent},
  {path: 'home1',component: Home1Component},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'search-person-details',component: SearchPersonDetailsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'sp-register', component: SpRegistrationComponent},
  {path: 'sp-supplier', component: SpSupplierComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard-pannel', pathMatch: 'full' },
      { path: 'dashboard-pannel', component: DashboardPannelComponent },
      { path: 'service-person-page', component: ServicePersonPageComponent},
      { path: 'service-request-page', component: ServiceRequestPageComponent},
      { path: 'add-asset-categories',component: AddAssetsCategoriesComponent},
      { path: 'show-asset-categories',component: ShowAssetsCategoriesComponent},
      { path: 'edit-asset-category/:id',component: EditAssetsCategoriesComponent},
      { path: 'add-service-category',component: AddServiceCategoryComponent},
      { path: 'show-service-category',component: ShowServiceCategoryComponent},
      { path: 'edit-service-category/:id',component: EditServiceCategoryComponent},
      { path: 'customer-report',component: CustomerReportsComponent},
      { path: 'admin-service-name',component: AdminServiceNameComponent},
      { path: 'show-service-names',component: ShowServiceNameComponent},
      { path: 'admin-update-service-name',component: AdminUpdateServiceNameComponent},
      { path: 'assets-category-report',component: AssetsCategoryReportComponent},
      { path: 'apiUrl',component:ApiUrlComponent},
      { path: 'admin-stock-master',component:AdminStockMasterComponent},
      { path: 'admin-show-master',component:AdminShowMasterComponent},
      { path: 'admin-update-master',component:AdminUpdateMasterComponent},
      { path: 'show-service-charge',component: AdminShowChargeComponent},
    ]
  },
  { path: 'verify-otp',component: VerfiyOtpComponent},
  { path: 'sp-verify-otp',component: SpVerifyOtpComponent},
  { path: 'sp-login',component: SpLoginComponent},
  { path: 'ms-verify-otp',component: MsVerifyOtpComponent},
  { path: 'ms-login',component: MsLoginComponent},
  { path: 'ms-forgot-password', component: MsForgotPasswordComponent},
  {
  path: 'ms-dashboard',
  component: MsDashboardComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'show-material-request', pathMatch: 'full' },
    { path: 'show-material-request', component: MsShowMaterialRequestComponent },
    { path: 'quotation-report', component: QuotationReportComponent },
    { path: 'invoice-report', component: InvoiceReportComponent },
    { path: 'add-assets', component: AddAssetsComponent },
    { path: 'edit-assets', component: EditAssetsComponent },
    { path: 'add-material', component: AddMaterialComponent },
    { path: 'show-material-list', component: ShowMaterialListComponent },
    { path: 'material-delivery-status', component: MaterialDeliveryStatusComponent }
  ]
}
,
  // {
  //   path: 'ms-dashboard', component: MsDashboardComponent,
  //   canActivate: [msAuthGuard],
  //   children: [
  //     { path: '', redirectTo: 'ms-profile', pathMatch: 'full' },
  //     { path: 'ms-profile', component: MsprofileComponent },
  //     { path: 'ms-stock-master', component: MsstockmasterComponent },
  //     { path: 'ms-show-master', component: MsshowmasterComponent },
  //     { path: 'ms-update-master', component: MsupdatemasterComponent },
  //     { path: 'ms-stock-price', component: MsstockpriceComponent },
  //     { path: 'ms-stock-report', component: MsstockreportComponent },
  //      {path: 'ms-update-profile', component: MsUpdateProfileComponent},
  //   ]
  // },
  { path: 'ec-dashboard',
    component: EcDashboardComponent,
    canActivate: [AuthGuard],
     children: [
      {path: '',redirectTo: 'ec-dashboard-pannel', pathMatch: 'full' },
      {path: 'ec-dashboard-pannel',component: EcDashboardPannelComponent},
      {path: 'update-profile',component: UpdateProfileComponent},
      {path: 'ec-service-request', component: EcServiceRequestComponent},
      {path: 'add-assets',component: AddAssetsComponent},
      {path: 'edit-assets',component: EditAssetsComponent},
      {path: 'edit-asset/:id', component: EditAssetsPageComponent},
      {path: 'service-request',component: ServiceRequestComponent},
      {path: 'reset-password',component: ResetPasswordComponent},
      {path: 'ec-profile',component: EcProfileComponent},
      {path: 'show-rental',component: ShowRentalComponent}
      // {path: 'add-asset-categories',component: AddAssetsCategoriesComponent},
      // {path: 'show-asset-categories',component: ShowAssetsCategoriesComponent},
      // {path: 'edit-asset-category/:id',component: EditAssetsCategoriesComponent}
     ]},

     { path: 'sp-dashboard', component: SpDashboardComponent,
     canActivate: [spAuthGuard],
    children: [

      {path: '',redirectTo: 'sp-profile', pathMatch: 'full' },
      {path: 'sp-profile',component: SpProfileComponent},
      {path: 'sp-add-service',component: SpAddServiceComponent},
      {path: 'sp-update-service/:category',component: SpUpdateServiceComponent  },
      {path: 'sp-reset-password',component: SpResetPasswordComponent},
      {path: 'sp-update-availability',component: SpUpdateAvailabilityComponent},
      {path: 'sp-service-request', component: SpServiceRequestComponent},
      {path: 'sp-showmy-services', component: SpShowmyServicesComponent},
      {path: 'sp-update-profile', component: SpUpdateProfileComponent},
      {path: 'add-service-charges',component: AddServiceChargesComponent},
      {path: 'update-service-charges',component:UpdateServiceChargeComponent},
      {path: 'show-service-charge',component: ShowServiceChargesComponent},
      {path: 'show-rental',component: ShowSpRentalComponent},
      {path: 'edit-assets',component: EditAssetsComponent},
      {path: 'add-assets',component: AddAssetsComponent},
      {path: 'delete-account',component: DeleteAccountComponent},



    ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
