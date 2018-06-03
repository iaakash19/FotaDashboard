import { Subject } from 'rxjs/Subject';
import { Directive, OnInit, OnDestroy, Input, ViewContainerRef, TemplateRef} from '@angular/core';
// import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from "angular-2-local-storage";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  // the role the user must have
  @Input() appHasRole: string;

  stop$ = new Subject();

  isVisible = false;

  /**
   * @param {ViewContainerRef} viewContainerRef
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService
   *   -- will give us access to the roles a user has
   */

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    let isSuperUser = this.localStorage.get("superuser");
    debugger;


  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }
}
