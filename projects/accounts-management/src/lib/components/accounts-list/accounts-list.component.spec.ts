import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsManagementService } from '../../accounts-management.service';
import { AccountsManagementTestingModule } from '../../tests/accounts-management-test.module';
import { mockAccountsList } from '../../tests/accounts-test';
import { AccountsListComponent } from './accounts-list.component';

describe('AccountsListComponent', () => {
  let component: AccountsListComponent;
  let service: AccountsManagementService;
  let fixture: ComponentFixture<AccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsListComponent ],
      imports: [AccountsManagementTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsListComponent);
    service = TestBed.inject(AccountsManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy Method', () => {

    it('should complete stop$', () => {
      spyOn(component['_stop$'], 'complete');
      spyOn(component['_stop$'], 'next');

      component.ngOnDestroy();

      expect(component['_stop$'].next).toHaveBeenCalled();
      expect(component['_stop$'].complete).toHaveBeenCalled();
    });

  });

  describe('Initialization', () => {

    it('should set the accounts list when there is or is pushed a value in the stream', () => {
      component.ngOnInit();
      
      service.accounts$.next(mockAccountsList);
      
      expect(component.accountsList).toEqual(mockAccountsList);
      expect(component.accountsList.length).toEqual(3);
      
      service.accounts$.next([]);
      expect(component.accountsList).toEqual([]);
      expect(component.accountsList.length).toEqual(0);

    });

    it('should set the exchange rate when there is or is pushed a value in the stream', () => {
      component.ngOnInit();
      
      service.exchangeRate$.next(2000);
      
      expect(component.exchangeRate).toEqual(2000);
      
      service.exchangeRate$.next(0);
      expect(component.exchangeRate).toEqual(0);
    });

  });

  describe('onShowDetail Method', () => {

    it('should navigates to the detail url', () => {
      const id: string = 'testID';
      spyOn(component['router'], 'navigateByUrl');

      component.onShowDetail(id);
      
      expect(component['router'].navigateByUrl).toHaveBeenCalledOnceWith(`/accounts/${id}`);
    });

    it('should set the exchange rate when there is or is pushed a value in the stream', () => {
      component.ngOnInit();
      
      service.exchangeRate$.next(2000);
      
      expect(component.exchangeRate).toEqual(2000);
      
      service.exchangeRate$.next(0);
      expect(component.exchangeRate).toEqual(0);
    });

  });

});
