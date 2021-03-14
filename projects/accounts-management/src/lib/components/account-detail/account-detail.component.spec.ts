import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AccountsManagementService } from '../../accounts-management.service';
import { AccountsManagementTestingModule } from '../../tests/accounts-management-test.module';
import { mockAccountsList, mockActiveRoute } from '../../tests/accounts-test';
import { AccountDetailComponent } from './account-detail.component';

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let service: AccountsManagementService;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ],
      imports: [AccountsManagementTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActiveRoute
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
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
      
      expect(component.selectedAccount).toEqual(mockAccountsList[0]);
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

describe('AccountDetailComponent without snapshot params', () => {
  let component: AccountDetailComponent;
  let service: AccountsManagementService;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ],
      imports: [AccountsManagementTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: undefined
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    service = TestBed.inject(AccountsManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {

    it('should set the accounts list when there is or is pushed a value in the stream', () => {
      component.ngOnInit();
      
      service.accounts$.next(mockAccountsList);
      
      expect(component.selectedAccount).toEqual(undefined);
    });

  });

});
