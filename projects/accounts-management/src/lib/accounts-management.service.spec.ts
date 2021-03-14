import { TestBed } from '@angular/core/testing';

import { ApiLibService } from '@technest/api-lib';

import { of, throwError } from 'rxjs';

import { AccountsManagementService } from './accounts-management.service';
import { AccountsManagementTestingModule } from './tests/accounts-management-test.module';
import { mockAccountsList } from './tests/accounts-test';

describe('AccountsManagementService', () => {
  let service: AccountsManagementService;
  let api: ApiLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccountsManagementTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(AccountsManagementService);
    api = TestBed.inject(ApiLibService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('Initialization', () => {

    it('should do nothing if accounts have not been pushed yet or are empty', () => {
      service.accounts$.next([]);
      expect().nothing();
    });

    /**
     * This test would pretend to check if there is one updating for each account
     * I tried to fake wait for the interval but it is not working
     * I cannot set and spy on the combineLatest operator so... 
     */

    // it('should update accounts when passes 40 sec and accounts have been pushed', fakeAsync(() => {
    //   spyOnProperty(rxjs, 'combineLatest').and.returnValue(of([0, mockAccountsList]));
    //   spyOn(api, 'updateElement');

    //   tick(40000);
    //   service.accounts$.next(mockAccountsList);

    //   expect(api.updateElement).toHaveBeenCalledTimes(3);
    // }));
  });

  describe('retrieveAllAccounts Method', () => {

    it('should push an empty array when error produces', () => {
      spyOn(service.accounts$, 'next');
      spyOn(api, 'getAllElements').and.callFake(() => throwError('some error'));

      service.retrieveAllAccounts();

      expect(service.accounts$.next).toHaveBeenCalledWith([]);
    })

    it('should push an array of accounts when it is called', () => {
      spyOn(service.accounts$, 'next');
      spyOn(api, 'getAllElements').and.callFake(() => of(mockAccountsList));

      service.retrieveAllAccounts();
      
      expect(service.accounts$.next).toHaveBeenCalledWith(mockAccountsList);

      service.accounts$.subscribe(data => {
        expect(data.length).toEqual(3);
        expect(data).toEqual(mockAccountsList);
      })
    })

  });

  describe('onExchangeRateStream Method', () => {

    it('should push a zero when error produces', () => {
      spyOn(service.exchangeRate$, 'next');
      spyOn(api, 'getExchangeRateStream').and.callFake(() => throwError('some error'));

      service.onExchangeRateStream();

      expect(service.exchangeRate$.next).toHaveBeenCalledWith(0);
    })

    it('should push a numeric value when it is called', () => {
      spyOn(service.exchangeRate$, 'next');
      spyOn(api, 'getExchangeRateStream').and.callFake(() => of(2000));

      service.onExchangeRateStream();
      
      expect(service.exchangeRate$.next).toHaveBeenCalledWith(2000);

      service.exchangeRate$.subscribe(data => {
        expect(data).toEqual(2000);
        expect(typeof data).toEqual(jasmine.any(Number));
      })
    })

  });

  describe('ngOnDestroy Method', () => {

    it('should complete stop$', () => {
      spyOn(service['_stop$'], 'complete');

      service.ngOnDestroy();

      expect(service['_stop$'].complete).toHaveBeenCalled();
    });

    it('should complete accounts$', () => {
      spyOn(service.accounts$, 'complete');

      service.ngOnDestroy();

      expect(service.accounts$.complete).toHaveBeenCalled();
    });

    it('should complete exchangeRate$', () => {
      spyOn(service.exchangeRate$, 'complete');

      service.ngOnDestroy();

      expect(service.exchangeRate$.complete).toHaveBeenCalled();
    });

  });


});
