import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const SITE_NAME = 'ng-mapcn';
const DEFAULT_TITLE = 'ng-mapcn - Beautiful maps made simple';

/** mapcn's metadata template: "%s - mapcn", with a default for the home page. */
@Injectable({ providedIn: 'root' })
export class SiteTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.buildTitle(snapshot);
    this.title.setTitle(page ? `${page} - ${SITE_NAME}` : DEFAULT_TITLE);
  }
}
